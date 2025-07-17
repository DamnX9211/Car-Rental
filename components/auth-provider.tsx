"use client"

import { createContext, useContext, useState } from "react"
import { AuthModal } from "@/components/auth-modal"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  showAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)
  
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, this would validate credentials with the backend
    setUser({
      id: "user-1",
      name: "John Doe",
      email: email
    })
    
    setShowModal(false)
  }
  
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, this would register the user in the backend
    setUser({
      id: "user-1",
      name: name,
      email: email
    })
    
    setShowModal(false)
  }
  
  const logout = () => {
    setUser(null)
  }
  
  const showAuthModal = () => {
    setShowModal(true)
  }
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, showAuthModal }}>
      {children}
      <AuthModal show={showModal} onClose={() => setShowModal(false)} />
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

