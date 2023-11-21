// Path: /dashboard/analytics
// Analytics Page
// Description: This page displays analytics for the application.

// Imports

// Import components
import AnalyticCard from "./components/AnalyticCard"
import AddressCharts from "./components/AddressCharts"

// Analytics Page
export default async function Analytics() {
    return (
        <div className="flex-1">
            <h1 className="text-4xl font-extrabold">Analytics</h1>

            {/* Patient Overview Cards */}
            <div className="py-8 flex flex-row flex-wrap gap-4">
                <AnalyticCard title="Total Patients" value="0" />
                <AnalyticCard title="Total Data" value="0" />
                <AnalyticCard title="Total Data Points" value="0" />
                <AnalyticCard title="Total Data Points" value="0" />
            </div>

            {/* Address Visualizations */}
            <div className="py-4">
                <AddressCharts />
            </div>
        </div>
    )
}
