// Component for Address in patient forms (new and edit)

// Imports
import Input from "@/components/Input"

// Component for address group in new patient form
const AddressGroup = ({
    address,
    index,
    setAddressAtIndex,
}: {
    address: {
        street: string
        city: string
        state: string
        zip: string
    }
    index: number
    setAddressAtIndex: (
        index: number,
        address: {
            street: string
            city: string
            state: string
            zip: string
        }
    ) => void
}) => {
    // Handler to update individual address field
    const updateField = (field: string, value: string) => {
        setAddressAtIndex(index, { ...address, [field]: value })
    }
    return (
        <div className="flex flex-col gap-2">
            {/* Street */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="text-sm w-20">Street</label>
                <Input
                    name="street"
                    placeholder="123 Main St"
                    type="text"
                    value={address.street}
                    setValue={(newValue) => updateField("street", newValue)}
                    required={true}
                    classes="text-sm flex-1"
                />
            </div>

            {/* City */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="text-sm w-20">City</label>
                <Input
                    name="city"
                    placeholder="New York City"
                    type="text"
                    value={address.city}
                    setValue={(newValue) => updateField("city", newValue)}
                    required={true}
                    classes="text-sm flex-1"
                />
            </div>

            {/* State */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="text-sm w-20">State</label>
                <select
                    className={`flex-1 p-2 text-base rounded-md border border-[#b6a896] focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]`}
                    name="state"
                    value={address.state}
                    onChange={(e) => updateField("state", e.target.value)}
                >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
            </div>

            {/* Zip */}
            <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label className="text-sm w-20">Zip</label>
                <Input
                    name="zip"
                    placeholder="10001"
                    type="text"
                    value={address.zip}
                    setValue={(newValue) => updateField("zip", newValue)}
                    required={true}
                    classes="text-sm flex-1"
                />
            </div>
        </div>
    )
}

export default AddressGroup
