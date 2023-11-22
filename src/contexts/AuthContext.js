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
    const [token, setToken] = useState("") // [1
    const [loading, setLoading] = useState(true)

    // On mount, subscribe to auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        // Cleanup subscription on unmount
        return unsubscribe
    }, [])

    // On user change, get token
    useEffect(() => {
        if (currentUser) {
            currentUser.getIdToken().then(setToken)
        }
    }, [currentUser])

    const value = {
        currentUser,
        loading,
        token,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
