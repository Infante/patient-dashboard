// Dashboard Page
"use client"

// Imports
import { useEffect } from "react"
import { redirect } from "next/navigation"

// Import hooks and components
import Loading from "@/components/Loading"
import { useAuth } from "@/contexts/AuthContext"
import { auth } from "@/lib/firebase"

export default function Dashboard() {
    // Get auth context
    const { loading, currentUser } = useAuth()

    // Redirect to login if not logged in
    useEffect(() => {
        if (!loading && !currentUser) return redirect("/")
    }, [loading, currentUser])

    // Display loading component while authentication state is being determined
    if (loading) return <Loading />

    // Return Dashboard
    return (
        <main className="h-screen flex justify-center items-center">
            <h1>{currentUser?.email}</h1>
            <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                    // Logout
                    auth.signOut()
                }}
            >
                Logout
            </button>
        </main>
    )
}
