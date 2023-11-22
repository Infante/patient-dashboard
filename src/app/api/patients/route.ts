// Path: /api/patients
// Description: API Route for Patients includes Create, Read
import { NextResponse } from "next/server"
import { NextApiRequest } from "next"
import admin from "@/lib/firebaseAdmin"
import { headers } from "next/headers"

// Patient Data Type
export type Patient = {
    // Status of patient
    status: "inquiry" | "churned" | "active" | "onboarding"
    // Patients name
    name: string
    // Date of birth
    dob: Date
    // Addresses of patient
    addresses: {
        street: string
        city: string
        state: string
        zip: string
    }[]
    // Notes about patient
    notes: string
    // Extra information about patient entered by user
    // can be used for things like insurance information
    // either string, number, or date
    extra?: {
        name: string
        value: string
        type: "string" | "number" | "date"
    }[]
}

// Authenticated middleware function
export const authenticated = async () => {
    // Get token from request headers
    const headersInstance = headers()
    const authorization = headersInstance.get("authorization")
    const token = authorization?.replace("Bearer ", "")

    // If no token return false
    if (!token) {
        return false
    }

    // Authenticate user using Firebase Token and Admin SDK
    const user = await admin.auth().verifyIdToken(token)

    // If user is not authenticated return error
    if (!user) {
        return false
    }

    // Return the user
    return user
}

// API Routes

// GET /api/patients
// Authenticate user using Firebase Token and Admin SDK
// Pull all users inside the users patients collection
// Return all patients
export const GET = async (req: Request) => {
    try {
        // Authenticate user using Firebase Token and Admin SDK
        const user = await authenticated()

        // If user is not authenticated return error
        if (!user) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                    success: false,
                    patients: [],
                },
                { status: 401 }
            )
        }

        // Pull all users inside the users patients collection
        const patientRef = admin
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("patients")

        const patients = (await patientRef.get()).docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            }
        })

        // Return all patients
        return NextResponse.json(
            {
                message: "Patients found",
                success: true,
                patients,
            },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: "Internal Server Error",
                success: false,
                patients: [],
            },
            { status: 500 }
        )
    }
}

// POST /api/patients
// Authenticate user using Firebase Token and Admin SDK
// Create new patient in users patients collection
// Return newly created patient
export const POST = async (req: Request) => {
    try {
        // Authenticate user using Firebase Token and Admin SDK
        const user = await authenticated()

        // If user is not authenticated return error
        if (!user) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                    success: false,
                },
                { status: 401 }
            )
        }

        // Destructure request body
        const {
            patient: { status, name, dob, addresses, notes },
        } = await req.json()

        // Validate mandatory fields
        if (!status || !name || !dob || !addresses || addresses.length === 0) {
            return NextResponse.json(
                {
                    message: "Missing mandatory fields",
                    success: false,
                },
                { status: 400 }
            )
        }
        // Validate status
        if (
            status !== "inquiry" &&
            status !== "churned" &&
            status !== "active" &&
            status !== "onboarding"
        ) {
            return NextResponse.json(
                {
                    message: "Invalid status",
                    success: false,
                },
                { status: 400 }
            )
        }
        // Validate addresses
        for (const address of addresses) {
            if (
                !address.street ||
                !address.city ||
                !address.state ||
                !address.zip
            ) {
                return NextResponse.json(
                    {
                        message: "Missing mandatory fields",
                        success: false,
                    },
                    { status: 400 }
                )
            }
        }

        // Create new patient in users patients collection
        let patient: Patient = {
            status,
            name,
            dob: new Date(dob),
            addresses,
            notes: notes || "",
        }

        const patientRef = admin
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("patients")
        const newPatientRef = await patientRef.add(patient)

        // Return success
        return NextResponse.json(
            {
                message: "Patient created",
                success: true,
            },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: "Internal Server Error",
                success: false,
            },
            { status: 500 }
        )
    }
}
