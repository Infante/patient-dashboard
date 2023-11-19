"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

// Create a context
const AuthContext = createContext()

// Use this hook to access the auth context
export const useAuth = () => {
    return useContext(AuthContext)
}

// Provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        // Cleanup subscription on unmount
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        loading,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
