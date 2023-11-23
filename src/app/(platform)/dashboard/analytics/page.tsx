// Path: /dashboard/analytics
// Analytics Page
// Description: This page displays analytics for the application.
"use client"
// Imports
import { useMemo } from "react"

// Import components hooks
import AnalyticCard from "./components/AnalyticCard"
import AddressCharts from "./components/AddressCharts"
import { usePatients, Patient } from "@/hooks/usePatients"
import { useAuth } from "@/contexts/AuthContext"

// Analytics Page
export default function Analytics() {
    // Get auth from useAuth hook
    const { token } = useAuth()

    // Get patients from usePatients hook
    const { data: patients, isLoading, isError } = usePatients(token)

    // Analytics

    // Computes analytics based on an array of patients.
    const computeAnalytics = (patients: Patient[]) => {
        // Total count of patients
        const totalPatients = patients.length

        // Count patients by status
        const statusCounts = patients.reduce(
            (acc, patient) => {
                switch (patient.status) {
                    case "inquiry":
                        acc.inquiry++
                        break
                    case "churned":
                        acc.churned++
                        break
                    case "active":
                        acc.active++
                        break
                    case "onboarding":
                        acc.onboarding++
                        break
                }
                return acc
            },
            {
                inquiry: 0,
                churned: 0,
                active: 0,
                onboarding: 0,
            }
        )

        // Count patients by city
        const cityCounts = patients.reduce<{
            [key: string]: number
        }>((acc, patient) => {
            const city = patient.addresses[0].city // Assumes at least one address is present
            acc[city] = (acc[city] || 0) + 1
            return acc
        }, {})

        return { totalPatients, statusCounts, cityCounts }
    }

    /*
        Memoization to prevent re-computation of analytics on every render.
        This is only done when the patients data is available and not in a loading state.
    */
    // Check if patients data is available and not in a loading state
    const analytics = useMemo(() => {
        return patients && !isLoading ? computeAnalytics(patients) : null
    }, [patients, isLoading])

    return (
        <div className="flex-1">
            <h1 className="text-4xl font-extrabold">Analytics</h1>

            {/* Patient Overview Cards */}
            <div className="py-8 flex flex-row flex-wrap gap-4">
                <AnalyticCard
                    title="Total Patients"
                    value={analytics ? analytics.totalPatients.toString() : "0"}
                />
                <AnalyticCard
                    title="Total Data"
                    value={analytics ? analytics.totalPatients.toString() : "0"}
                />
                <AnalyticCard
                    title="Total Data Points"
                    value={analytics ? analytics.totalPatients.toString() : "0"}
                />
                <AnalyticCard
                    title="Total Data Points"
                    value={analytics ? analytics.totalPatients.toString() : "0"}
                />
            </div>

            {/* Address Visualizations */}
            <div className="py-4">
                <AddressCharts
                    cityCounts={analytics ? analytics.cityCounts : {}}
                />
            </div>
        </div>
    )
}
