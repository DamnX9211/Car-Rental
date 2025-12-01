"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { AuthModal } from "@/components/auth-modal"
import { apiFetch } from "@/lib/api"

type AuthUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  //role: string
}

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
  logout: () => void
  showAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  )
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
        const storedToekn = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if ( !storedToekn || user) return;

        apiFetch<{ succes: boolean;  data: {user: any }}>("/api/auth/me")
        .then((res) => {
          const backendUser = res.data.user;
          setUser({
            id: backendUser._id ?? backendUser.id,
            firstName: backendUser.firstName,
            lastName: backendUser.lastName,
            email: backendUser.email,
          })
          setToken(storedToekn)
        })
        .catch(() => {
          localStorage.removeItem("token")
          setToken(null)
          setUser(null)
        })
  }, [])
  
  const login = async (email: string, password: string) => {
    // Simulate API call
    const res = await apiFetch<{ 
      success: boolean;
      message: string; 
      data: { user: any; token: string }}
      >("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password}),
    })
    const { user: backendUser, token } = res.data;
    localStorage.setItem("token", token)
    setToken(token)
    setUser({
      id: backendUser._id ?? backendUser.id,
      firstName: backendUser.firstName,
      lastName: backendUser.lastName,
      email: backendUser.email,
    })
    setShowModal(false)
  }
    
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    const res = await apiFetch<{ 
      success: boolean
      message: string
      data: { user: any; token: string } }
      >("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password}),
    })
    const { user: backendUser, token } = res.data;
    localStorage.setItem("token", token)
    setToken(token)
    setUser({
      id: backendUser._id ?? backendUser.id,
      firstName: backendUser.firstName,
      lastName: backendUser.lastName,
      email: backendUser.email,
    })
    setShowModal(false)
  }
    
  const logout = () => {
    setUser(null)
    setToken(null)
    if(typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }
  
  const showAuthModal = () => {
    setShowModal(true)
  }
  
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, showAuthModal }}>
      {children}
      <AuthModal show={showModal} onClose={() => setShowModal(false)} />
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

