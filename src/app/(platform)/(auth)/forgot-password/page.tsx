// Path: /forgot-password
// ForgotPassword Page
// Render the forgot password form, if already logged in, redirect to dashboard
"use client"

// Imports
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { sendPasswordResetEmail } from "firebase/auth"

// Import hooks and components
import { auth } from "@/lib/firebase"
import { useAuth } from "@/contexts/AuthContext"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Loading from "@/components/Loading"

export default function ForgotPassword() {
    // Accessing authentication context
    const { loading, currentUser } = useAuth()

    // State declarations for user input and form submission status
    const [email, setEmail] = useState<string>("")
    const [submitting, setSubmitting] = useState<boolean>(false)

    // Redirect to dashboard if logged in
    useEffect(() => {
        if (!loading && currentUser) return redirect("/dashboard")
    }, [loading, currentUser])

    // Function to handle password reset
    const handlePasswordReset = async () => {
        try {
            setSubmitting(true)
            await sendPasswordResetEmail(auth, email)
            toast.success("Password reset email sent.")
            setSubmitting(false)
        } catch (error: any) {
            setSubmitting(false)
            // Firebase error handler
            if (error.code && error.message) {
                // Display a more user-friendly message based on the error code
                switch (error.code) {
                    case "auth/user-not-found":
                        toast.error("No user found with this email.")
                        break
                    case "auth/invalid-email":
                        toast.error("Invalid email.")
                        break
                    case "auth/network-request-failed":
                        toast.error("Network error. Please try again.")
                        break
                    default:
                        toast.error(error.message)
                }
            }
        }
    }

    // Display loading component while authentication state is being determined
    if (loading) {
        return <Loading></Loading>
    }

    // Rendering forgot password form
    return (
        <div className="bg-[url('/background.svg')] bg-fixed bg-center bg-cover h-screen flex justify-center items-center p-8">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handlePasswordReset()
                }}
                className="max-w-md flex-1 flex flex-col"
            >
                <Image
                    src="/finni.svg"
                    width={100}
                    height={100}
                    alt="Finni Logo"
                />

                {/* Email input */}
                <Input
                    classes="mt-8"
                    name="Email"
                    placeholder="roberto@finnihealth.com"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    required
                />

                {/* Submit reset button */}
                <Button
                    classes="mt-4"
                    text="Reset password"
                    type="primary"
                    loading={submitting}
                />

                {/* Sign in link */}
                <p className="text-light text-sm text-center mt-4">
                    <Link
                        href="/"
                        className="text-primary cursor-pointer underline hover:opacity-70"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    )
}
