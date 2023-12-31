// Path: /signup
// Signup Page
// Render the signup form, if already logged in, redirect to dashboard
"use client"

// Imports
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaGoogle } from "react-icons/fa"

// Import hooks and components
import Button from "@/components/Button"
import Input from "@/components/Input"
import Loading from "@/components/Loading"
import { useAuth } from "@/contexts/AuthContext"
import { auth, firestore } from "@/lib/firebase"

export default function Signup() {
    // Accessing authentication context
    const { loading, currentUser } = useAuth()

    // State declarations for user input and form submission status
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")
    const [submitting, setSubmitting] = useState<boolean>(false)

    // Redirect to dashboard if logged in
    useEffect(() => {
        if (!loading && currentUser) return redirect("/dashboard")
    }, [loading, currentUser])

    // Function to handle user signup
    const handleSignup = async () => {
        try {
            // Validate email and password
            if (password !== password2) {
                toast.error("Passwords do not match.")
                return
            }

            setSubmitting(true)
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            // Create user object in firestore
            const { user } = userCredential

            // Additional user data you might want to store
            const additionalUserInfo = {
                email: user.email,
                createdAt: new Date(),
                // ...any other info you want to store
            }

            // Add a record in Firestore in the 'users' collection
            await setDoc(doc(firestore, "users", user.uid), additionalUserInfo)

            toast.success("Account created successfully.")
        } catch (error: any) {
            setSubmitting(false)
            // Firebase error handler
            if (error.code && error.message) {
                // Display a more user-friendly message based on the error code
                switch (error.code) {
                    case "auth/email-already-in-use":
                        toast.error("Email already in use.")
                        break
                    case "auth/invalid-email":
                        toast.error("Invalid email.")
                        break
                    case "auth/weak-password":
                        toast.error("Weak password.")
                        break
                    case "auth/network-request-failed":
                        toast.error(
                            "Network error. Please check your connection."
                        )
                        break
                    default:
                        toast.error("Something went wrong. Please try again.")
                        break
                }
            }
        }
    }

    // Function to handle Google login
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: "select_account" })
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        // Check if the user record exists in Firestore
        const userRef = doc(firestore, "users", user.uid)
        const docSnap = await getDoc(userRef)

        if (!docSnap.exists()) {
            // Create a new user record in Firestore if it doesn't exist
            const additionalUserInfo = {
                email: user.email,
                createdAt: new Date(),
                // ...any other info you want to store
            }
            await setDoc(userRef, additionalUserInfo)
        }

        toast.success("Signed in with Google successfully.")
        // Redirect to the dashboard or desired page
    }

    // Display loading component while authentication state is being determined
    if (loading) return <Loading />

    // Rending signup form
    return (
        <main className="bg-[url('/background.svg')] bg-fixed bg-center bg-cover h-screen flex justify-center items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSignup()
                }}
                className="max-w-md flex-1 flex flex-col"
            >
                <Image
                    src="/finni.svg"
                    width={100}
                    height={100}
                    alt="Finni Logo"
                />

                {/* Login inputs */}
                <Input
                    classes="mt-8"
                    name="Email"
                    placeholder="roberto@finnihealth.com"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    required
                />

                <Input
                    classes="mt-4"
                    name="Password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    setValue={setPassword}
                    required
                />

                <Input
                    classes="mt-4"
                    name="Password2"
                    placeholder="Confirm Password"
                    type="password"
                    value={password2}
                    setValue={setPassword2}
                    required
                />

                {/* Sign in button */}
                <Button
                    classes="mt-4"
                    text="Sign up"
                    type="primary"
                    loading={submitting}
                    // onClick={() => console.log("Sign up")}
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
                    text="Sign up with Google"
                    type="secondary"
                    icon={<FaGoogle className="mr-2" size={14} />}
                    onClick={() => handleGoogleLogin()}
                />

                <p className="text-light text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link
                        href="/"
                        className="text-primary cursor-pointer underline hover:opacity-70"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </main>
    )
}
