// Description: AddressCharts component that displays the overview of where your patients are located.

// Import components
import { Progress } from "@/components/ui/progress"

const AddressCharts = ({
    cityCounts,
}: {
    cityCounts: { [key: string]: number }
}) => {
    return (
        <div className="flex-1 rounded-lg border border-stroke bg-white p-8">
            {/* Display a list of addresses with a progress bar representing how much of a % of patients reside in that city */}
            <h5 className="text-2xl font-bold">Top Locations</h5>
            <p className="text-sm text-light">
                The top locations where your patients are located. This is
                determined by the address they provided when they signed up.
            </p>
            {
                // Display a list of addresses with a progress bar representing how much of a % of patients reside in that city
                Object.keys(cityCounts).map((city) => {
                    let percentage = (
                        (cityCounts[city] / Object.keys(cityCounts).length) *
                        100
                    ).toFixed(0)
                    return (
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex flex-row justify-between">
                                <p className="font-medium text-sm">{city}</p>
                                <p className="font-bold text-sm">
                                    {percentage}%
                                </p>
                            </div>
                            <Progress
                                className="h-4 bg-[#ED762F]/20"
                                value={parseInt(percentage)}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AddressCharts
