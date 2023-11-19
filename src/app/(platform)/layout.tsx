// Set to use client for auth
"use client"

// Imports Context
import { AuthProvider } from "@/contexts/AuthContext"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/* Wrap body in auth context */}
            <AuthProvider>{children}</AuthProvider>
        </html>
    )
}
