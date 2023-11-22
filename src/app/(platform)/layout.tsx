// Layout for all routes on the platform
// Wrap app in AuthProvider to use auth context

// Set to use client for auth
"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Import react hot toast
import { Toaster } from "react-hot-toast"

// Imports Context
import { AuthProvider } from "@/contexts/AuthContext"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient()
    return (
        <>
            {/* Wrap body in auth context */}
            <AuthProvider>
                {/* Wrap body in query client */}
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
                <Toaster position="bottom-center" reverseOrder={false} />
            </AuthProvider>
        </>
    )
}
