export async function apiFetch<T>(path: string, options: RequestInit ={}){
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    const headers = new Headers(options.headers)
    headers.set("Content-Type", "application/json")
    if(token) headers.set("Authorization", `Bearer ${token}`)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers,
        credentials: "include",
    })

    if(!response.ok){
        const errorBody = await response.json().catch(() => ({}))
        const message = errorBody.message || response.statusText || "An error occurred"
        
        if(response.status === 401 && typeof window !== "undefined"){
            localStorage.removeItem("token")
            //window.location.reload()
        }
        throw new Error(message)
    }

    return response.json() as Promise<T>
}