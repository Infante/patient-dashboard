// Patients View Dashboard Page
// Description: Page for the patients view on the dashboard, display table of patients
"use client"

// Imports
import { useEffect } from "react"
import { redirect } from "next/navigation"

// Import hooks and components
import Loading from "@/components/Loading"
import { useAuth } from "@/contexts/AuthContext"
import { auth } from "@/lib/firebase"

export default function Patients() {
    // Get auth context
    const { loading, currentUser } = useAuth()

    // Redirect to login if not logged in
    useEffect(() => {
        if (!loading && !currentUser) return redirect("/")
    }, [loading, currentUser])

    // Display loading component while authentication state is being determined
    if (loading) return <Loading />

    // Return Patients
    return <div></div>
}
