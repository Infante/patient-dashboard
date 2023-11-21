// Path: /
// Login Page
// Render the login form, if already logged in, redirect to dashboard
"use client"

// Imports
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaGoogle } from "react-icons/fa"
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth"

// Import hooks and components
import { auth } from "@/lib/firebase"
import { useAuth } from "@/contexts/AuthContext"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Loading from "@/components/Loading"

export default function Login() {
    // Accessing authentication context
    const { loading, currentUser } = useAuth()

    // State declarations for user input and form submission status
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [submitting, setSubmitting] = useState<boolean>(false)

    // Redirect to dashboard if logged in
    useEffect(() => {
        if (!loading && currentUser) return redirect("/dashboard")
    }, [loading, currentUser])

    // Function to handle user login
    const handleLogin = async () => {
        try {
            setSubmitting(true)
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            setSubmitting(false)
            // Firebase error handler
            if (error.code && error.message) {
                // Display a more user-friendly message based on the error code
                switch (error.code) {
                    case "auth/user-not-found":
                        toast.error("No user found with this email.")
                        break
                    case "auth/invalid-login-credentials":
                        toast.error("Invalid login credentials.")
                        break
                    case "auth/wrong-password":
                        toast.error("Incorrect password. Please try again.")
                        break
                    case "auth/network-request-failed":
                        toast.error(
                            "Network error. Please check your connection."
                        )
                        break
                    // Add more cases as needed for different error codes
                    default:
                        toast.error("Error signing in. Please try again.")
                }
            } else {
                // Fallback error message
                toast.error("Error signing in. Please try again.")
            }
        }
    }

    // Function to handle Google login
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: "select_account" })
        signInWithPopup(auth, provider)
    }

    // Display loading component while authentication state is being determined
    if (loading) {
        return <Loading></Loading>
    }

    // Rendering the login form
    return (
        <div className="bg-[url('/background.svg')] bg-fixed bg-center bg-cover h-screen flex justify-center items-center p-8">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin()
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

                {/* Password input */}
                <Input
                    classes="mt-4"
                    name="Password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    setValue={setPassword}
                    required
                />

                {/* Forgot password */}
                <Link
                    href="/forgot-password"
                    className="mt-2 text-sm text-light underline"
                >
                    Forgot your password?
                </Link>

                {/* Sign in button */}
                <Button
                    classes="mt-4"
                    text="Sign in"
                    type="primary"
                    loading={submitting}
                />

                {/* Seperator */}
                <div className="flex mt-8">
                    <div className="flex-1 border-b border-stroke"></div>
                    <p className="mx-2 text-sm text-light">or</p>
                    <div className="flex-1 border-b border-stroke"></div>
                </div>

                {/* Google Sign in */}
                <Button
                    classes="mt-8"
                    text="Sign in with Google"
                    type="secondary"
                    onClick={() => handleGoogleLogin()}
                    icon={<FaGoogle className="mr-2" size={14} />}
                />

                {/* Sign up link */}
                <p className="text-light text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-primary cursor-pointer underline hover:opacity-70"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    )
}
