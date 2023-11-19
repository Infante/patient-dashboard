// Layout for all routes on the platform
// Setup global styles, fonts and metadata

// Imports
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Set metadata for app
export const metadata: Metadata = {
    title: "Finni Demo",
    description:
        "Finni Health provides world class ABA services near you. We help ease the entire process of ASD, from start to finni!",
    themeColor: "#e66e32",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
