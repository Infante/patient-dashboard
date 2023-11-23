// Path: /api/patients/:id
// Description: API Route for Patient specific actions such as update and delete
import admin from "@/lib/firebaseAdmin"
import { NextResponse } from "next/server"
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

// PUT /api/patients/:id
// Authenticate user using Firebase Token and Admin SDK
// Update patient in users patients collection
// Return updated patient
export const PUT = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        // Destructure request params
        const { id } = params

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

        // Update patient in users patients collection
        let patient: Patient = {
            id,
            status,
            name,
            dob,
            addresses,
            notes: notes || "",
        }

        // Add extra fields if they exist
        if (extra) {
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
            }
            patient.extra = extra
        }

        console.log(patient)

        const patientRef = admin
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("patients")
            .doc(id)
        await patientRef.set(patient, { merge: true })

        // Return success
        return NextResponse.json(
            {
                message: "Patient updated",
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

// DELETE /api/patients/:id
// Authenticate user using Firebase Token and Admin SDK
// Delete patient in users patients collection
// Return success
export const DELETE = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        // Destructure request params
        const { id } = params

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

        // Delete patient in users patients collection
        const patientRef = admin
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("patients")
            .doc(id)
        await patientRef.delete()

        // Return success
        return NextResponse.json(
            {
                message: "Patient deleted",
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
