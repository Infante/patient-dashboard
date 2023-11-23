// Path: /api/patients/:id
// Description: API Route for Patient specific actions such as update and delete
import { NextResponse } from "next/server"
import { NextApiRequest } from "next"
import admin from "@/lib/firebaseAdmin"
import { Patient, authenticated } from "../route"

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
