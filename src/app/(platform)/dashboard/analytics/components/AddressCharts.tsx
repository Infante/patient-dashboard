// Description: AddressCharts component that displays the overview of where your patients are located.

// Import components
import { Progress } from "@/components/ui/progress"

const AddressCharts = ({}: {}) => {
    return (
        <div className="flex-1 rounded-lg border border-stroke bg-white p-8">
            {/* Display a list of addresses with a progress bar representing how much of a % of patients reside in that city */}
            <h5 className="text-2xl font-bold">Top Locations</h5>
            <p className="text-sm text-light">
                The top locations where your patients are located. This is
                determined by the address they provided when they signed up.
            </p>

            <div className="mt-4 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                        <p className="font-medium text-sm">San Francisco</p>
                        <p className="font-bold text-sm">20%</p>
                    </div>
                    <Progress className="h-4 bg-[#ED762F]/20" value={20} />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                        <p className="font-medium text-sm">Los Angeles</p>
                        <p className="font-bold text-sm">80%</p>
                    </div>
                    <Progress className="h-4 bg-[#ED762F]/20" value={80} />
                </div>
            </div>
        </div>
    )
}

export default AddressCharts
