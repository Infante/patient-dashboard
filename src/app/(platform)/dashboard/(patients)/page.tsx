// Path: /dashboard
// Patients View Dashboard Page
// Description: Page for the patients view on the dashboard, display table of patients

// Import hooks and components
import { Patient, columns } from "./Columns"
import { DataTable } from "./components/DataTable"
import PatientActions from "./components/PatientActions"

// Function to get data from API
async function getData(): Promise<Patient[]> {
    // Fetch data from your API here.
    return [
        {
            name: "John Doe",
            dob: new Date("01/01/2001"),
            addresses: [
                {
                    city: "New York City",
                    state: "NY",
                    street: "123 Main St",
                    zip: "10001",
                },
            ],
            status: "active",
        },
        {
            name: "Roberto Infante",
            dob: new Date("01/01/2001"),
            addresses: [
                {
                    city: "New York City",
                    state: "NY",
                    street: "123 Main St",
                    zip: "10001",
                },
                {
                    city: "Brooklyn",
                    state: "NY",
                    street: "321 Main St",
                    zip: "10001",
                },
            ],
            status: "churned",
        },
        {
            name: "Foxy Fox",
            dob: new Date("01/01/2001"),
            addresses: [
                {
                    city: "New York City",
                    state: "NY",
                    street: "123 Main St",
                    zip: "10001",
                },
            ],
            status: "inquiry",
        },
    ]
}

// Patients Page
export default async function Patients() {
    // Pull data from API
    const data = await getData()

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

            <div className="py-4">
                {/* Render datatable with columns and data */}
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
