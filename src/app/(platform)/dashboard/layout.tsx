// Layout for all Dashboard Routes
// Description: Layout for all dashboard routes, checks authentication state and redirects to login if not logged in, will render dash layout and children
"use client"

// Imports
import { useEffect } from "react"
import { redirect } from "next/navigation"

// Import hooks components
import { useAuth } from "@/contexts/AuthContext"
import Layout from "@/components/tailwind/Layout"
import Loading from "@/components/Loading"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Get auth context
    const { loading, currentUser } = useAuth()

    // Redirect to login if not logged in
    useEffect(() => {
        if (!loading && !currentUser) return redirect("/")
    }, [loading, currentUser])

    // Display loading component while authentication state is being determined
    if (loading) return <Loading />

    return <Layout>{children}</Layout>
}
