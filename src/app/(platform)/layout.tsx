// Layout for all routes on the platform
// Wrap app in AuthProvider to use auth context

// Set to use client for auth
"use client"

// Import react hot toast
import { Toaster } from "react-hot-toast"

// Imports Context
import { AuthProvider } from "@/contexts/AuthContext"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Wrap body in auth context */}
            <AuthProvider>
                {children}
                <Toaster position="bottom-center" reverseOrder={false} />
            </AuthProvider>
        </>
    )
}
