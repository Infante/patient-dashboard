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
export const PUT = async (req: NextApiRequest) => {
    try {
        // Authenticate user using Firebase Token and Admin SDK
        const user = await authenticated()
        const { id } = req.query as { id: string } // Patient ID

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
        const { status, name, dob, addresses, notes, extra } =
            req.body as Patient

        // Validate mandatory fields
        if (
            !status ||
            !name ||
            !dob ||
            !addresses ||
            addresses.length === 0 ||
            !notes
        ) {
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
            status,
            name,
            dob,
            addresses,
            notes,
        }

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
export const DELETE = async (req: NextApiRequest) => {
    try {
        // Authenticate user using Firebase Token and Admin SDK
        const user = await authenticated()
        const { id } = req.query as { id: string } // Patient ID

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
