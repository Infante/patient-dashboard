// Path: /dashboard
// Patients View Dashboard Page
// Description: Page for the patients view on the dashboard, display table of patients

// Import hooks and components
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

// Function to get data from API
async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}

// Patients Page
export default async function Patients() {
    // Pull data from API
    const data = await getData()

    // Return Patients Page
    return (
        <div className="flex-1">
            <div className="flex flex-row space-x-2">
                <h1 className="text-4xl font-bold">Patients</h1>
            </div>
            <p className="text-[#b6a896]">Manage your patients data.</p>

            <div className="py-8">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
