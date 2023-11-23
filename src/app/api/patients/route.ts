// Path: /api/patients
// Description: API Route for Patients includes Create, Read
import { NextResponse } from "next/server"
import { NextApiRequest } from "next"
import admin from "@/lib/firebaseAdmin"
import { headers } from "next/headers"

// Patient Data Type
type Patient = {
    id: string
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
const authenticated = async () => {
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
            patient: { status, name, dob, addresses, notes, extra },
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
        // Create patient UID
        const id = admin.firestore().collection("patients").doc().id
        let patient: Patient = {
            id,
            status,
            name,
            dob: dob,
            addresses,
            notes: notes || "",
        }

        // Set extra fields if they exist
        if (extra && extra.length > 0) {
            // Validate extra fields
            for (const field of extra) {
                if (!field.name || !field.value || !field.type) {
                    return NextResponse.json(
                        {
                            message: "Missing mandatory fields",
                            success: false,
                        },
                        { status: 400 }
                    )
                }
                if (
                    field.type !== "string" &&
                    field.type !== "number" &&
                    field.type !== "date"
                ) {
                    return NextResponse.json(
                        {
                            message: "Invalid type",
                            success: false,
                        },
                        { status: 400 }
                    )
                }
            }
            // Set extra fields
            patient = {
                ...patient,
                extra,
            }
        }

        // Insert patient into database
        const patientRef = admin
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("patients")

        await patientRef.doc(id).set(patient)

        // Return success
        return NextResponse.json(
            {
                message: "Patient created",
                success: true,
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal Server Error",
                success: false,
            },
            { status: 500 }
        )
    }
}
