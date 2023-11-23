"use client"
// Path: /dashboard
// Patients View Dashboard Page
// Description: Page for the patients view on the dashboard, display table of patients

// Import hooks and components
import { columns } from "./Columns"
import DataTable from "./components/DataTable"
import PatientActions from "./components/PatientActions"
import Spinner from "@/components/Spinner"
import { usePatients } from "@/hooks/usePatients"
import { useAuth } from "@/contexts/AuthContext"

// Patients Page
export default function Patients() {
    // Get auth from useAuth hook
    const { token } = useAuth()

    // Get patients from usePatients hook
    const { data, isLoading, isError } = usePatients(token)

    // Return Patients Page
    return (
        <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-4xl font-extrabold">Patients</h1>

                <div className="flex flex-row gap-2">
                    {/* Render patient actions such as: Add new patient, export */}
                    <PatientActions />
                </div>
            </div>

            <div className="relative py-4">
                {/* On loading display loading animation */}
                {isLoading ? (
                    <div className="absolute w-full h-full flex items-center justify-center">
                        <Spinner />{" "}
                    </div>
                ) : null}

                {/* On error display error */}
                {isError ? (
                    <div className="py-4 text-sm text-rose-500">
                        Network request error.. Please try again!
                    </div>
                ) : null}

                {/* Render datatable with columns and data */}
                {data ? <DataTable columns={columns} data={data} /> : null}
            </div>
        </div>
    )
}
