// usePatients hook
// Description: This hook is used to get, add and update patients
// Utilizes react-query to cache and load data

// Imports
import { useMemo } from "react"
import {
    useQueryClient,
    useQuery,
    useMutation,
    UseQueryResult,
} from "@tanstack/react-query"
import ky from "ky-universal"

// Types
export type Patient = {
    id?: string
    status: "inquiry" | "churned" | "active" | "onboarding"
    name: string
    dob: Date
    addresses: {
        street: string
        city: string
        state: string
        zip: string
    }[]
    notes: string
}

// API requests

// GET /api/patients
const fetchPatients = async (token: string): Promise<Patient[]> => {
    const resp = await ky("/api/patients", {
        headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
    })

    const body: {
        success: boolean
        patients: Patient[]
        message: string
    } = await resp.json() // Await the resolution of the promise

    return body.patients // Now you can access 'patients' property
}

// POST /api/patients
const addPatient = async (
    patient: Patient,
    token: string
): Promise<Patient> => {
    return ky
        .post("/api/patients", {
            json: {
                patient,
            },
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
        })
        .json()
}

// PUT /api/patients/:id
const updatePatient = async (
    patient: Patient,
    token: string
): Promise<Patient> => {
    return ky
        .put(`/api/patients/${patient.id}`, {
            json: {
                patient,
            },
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
        })
        .json()
}

// DELETE /api/patients/:id
const deletePatient = async (
    patient: Patient,
    token: string
): Promise<Patient> => {
    return ky
        .delete(`/api/patients/${patient.id}`, {
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
        })
        .json()
}

// Analytics computation
// const computeAnalytics = (patients: Patient[]) => {
//     const statusCounts = /* logic to count patients per status */;
//     const totalPatients = patients.length;
//     const cityCounts = /* logic to count patients by city */;

//     return { statusCounts, totalPatients, cityCounts };
// };

// Hooks

// Get patients hook
const usePatients = (token: string): UseQueryResult<Patient[], unknown> => {
    return useQuery<Patient[], unknown>({
        queryKey: ["patients"],
        queryFn: () => fetchPatients(token),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 10, // 10 minutes
        enabled: !!token, // Only run the query if the token exists
    })
}

// Patients analytics hook
// const usePatientAnalytics = (limit: number) => {
//     const { data: patients } = usePatients(limit)
//     return useMemo(() => computeAnalytics(patients), [patients])
// }

// Add patient hook
const useAddPatient = (token: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (patient: Patient) => addPatient(patient, token),
        retry: 3,
        onSuccess: () => {
            // Invalidate patients cache
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        },
    })
}

// Update patient hook
const useUpdatePatient = (token: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (patient: Patient) => updatePatient(patient, token),
        retry: 3,
        onSuccess: () => {
            // Invalidate patients cache
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        },
    })
}

// Delete patient hook
const useDeletePatient = (token: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (patient: Patient) => deletePatient(patient, token),
        retry: 3,
        onSuccess: () => {
            // Invalidate patients cache
            queryClient.invalidateQueries({ queryKey: ["patients"] })
        },
    })
}

export {
    usePatients,
    fetchPatients,
    useAddPatient,
    useUpdatePatient,
    useDeletePatient,
}
