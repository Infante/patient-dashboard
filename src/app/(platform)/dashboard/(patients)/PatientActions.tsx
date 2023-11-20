// PatientActions
// Patient page actions, such as adding new patient, deleting, updating columns, etc.
"use client"
import { useState } from "react"

// Import components
import Button from "@/components/Button"
import Input from "@/components/Input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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

// PatientActions component
const PatientActions = () => {
    // States for new patient form
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [dob, setDob] = useState<string>("")
    const [status, setStatus] = useState<
        "active" | "churned" | "inquiry" | "onboarding"
    >("inquiry")
    const [addresses, setAddresses] = useState<
        {
            street: string
            city: string
            state: string
            zip: string
        }[]
    >([])

    // Error state
    const [error, setError] = useState<string | null>(null)

    // Handler to update a specific address at an index
    const setAddressAtIndex = (
        index: number,
        newAddress: {
            street: string
            city: string
            state: string
            zip: string
        }
    ) => {
        setAddresses(
            addresses.map((addr, i) => (i === index ? newAddress : addr))
        )
    }

    // Handler to add a new patient
    const handleAddPatinet = () => {
        // Create new patient
        const newPatient = {
            name: `${firstName} ${lastName}`,
            dob: new Date(dob),
            addresses,
            status,
        }

        console.log(newPatient)

        // Validate patient by checking for empty fields
        if (!firstName || !lastName || !dob || !status) {
            setError("Please fill out all fields.")
            return
        }

        // Validate addresses
        if (addresses.length === 0) {
            setError("Please add at least one address.")
            return
        }
        for (const address of addresses) {
            if (
                !address.street ||
                !address.city ||
                !address.state ||
                !address.zip
            ) {
                setError("Please fill out all fields.")
                return
            }
        }

        // Reset error
        setError(null)

        // Send patient to API
        console.log("Submitting patient to API...")
    }

    return (
        <>
            {/* <Button
                icon={
                    <HiOutlineDocumentDownload className="text-xl text-black" />
                }
                classes="max-h-[40px] px-6 text-sm"
                text="Export"
                type="secondary"
                onClick={() => {}}
            /> */}

            <Dialog>
                <DialogTrigger>
                    <Button
                        classes="max-h-[40px] px-6 text-sm"
                        text="Add Patient"
                        type="primary"
                        onClick={() => {}}
                    />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Patient</DialogTitle>
                        <DialogDescription>
                            Add a new patient to your records.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Add Patient Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleAddPatinet()
                        }}
                        className="max-h-[500px] overflow-y-scroll"
                    >
                        <div className="flex flex-col gap-4">
                            {/* Patient Information */}
                            <h5 className="mt-2 font-bold text-sm">
                                Patient Information
                            </h5>
                            {/* First name */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <label className="text-sm w-20">
                                    First Name
                                </label>
                                <Input
                                    name="first_name"
                                    placeholder="Tony"
                                    type="text"
                                    value={firstName}
                                    setValue={setFirstName}
                                    required={true}
                                    classes="text-sm flex-1"
                                />
                            </div>

                            {/* Last name */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <label className="text-sm w-20">
                                    Last Name
                                </label>
                                <Input
                                    name="last_name"
                                    placeholder="Sopranos"
                                    type="text"
                                    value={lastName}
                                    setValue={setLastName}
                                    required={true}
                                    classes="text-sm flex-1"
                                />
                            </div>

                            {/* DOB */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <label className="text-sm w-20">Birthday</label>
                                <input
                                    className={`flex-1 p-2 text-base rounded-md border border-[#b6a896] focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]`}
                                    type="date"
                                    name="dob"
                                    value={dob}
                                    max={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </div>

                            {/* Status */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <label className="text-sm w-20">Status</label>
                                <select
                                    className={`flex-1 p-2 text-base rounded-md border border-[#b6a896] focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]`}
                                    name="status"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value as
                                                | "active"
                                                | "churned"
                                                | "inquiry"
                                                | "onboarding"
                                        )
                                    }
                                >
                                    <option value="inquiry">Inquiry</option>
                                    <option value="onboarding">
                                        Onboarding
                                    </option>
                                    <option value="active">Active</option>
                                    <option value="churned">Churned</option>
                                </select>
                            </div>

                            {/* Render addresses */}
                            {addresses.map((address, index) => {
                                return (
                                    <>
                                        {/* Address */}
                                        <h5 className="mt-2 font-bold text-sm">
                                            Address {index + 1}
                                        </h5>

                                        {/* Address 1 group */}
                                        <AddressGroup
                                            key={index}
                                            address={address}
                                            index={index}
                                            setAddressAtIndex={
                                                setAddressAtIndex
                                            }
                                        />

                                        {/* Remove address group */}
                                        <Button
                                            classes="max-h-[40px] px-6 text-sm"
                                            text="Remove Address"
                                            type="secondary"
                                            onClick={() => {
                                                setAddresses(
                                                    addresses.filter(
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }}
                                        />
                                    </>
                                )
                            })}

                            {/* Add new address button */}
                            <Button
                                classes="max-h-[40px] px-6 text-sm"
                                text="Add Address"
                                type="secondary"
                                onClick={() => {
                                    setAddresses([
                                        ...addresses,
                                        {
                                            street: "",
                                            city: "",
                                            state: "",
                                            zip: "",
                                        },
                                    ])
                                }}
                            />
                        </div>
                    </form>

                    <DialogFooter className="mt-4">
                        {/* Form Error */}
                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <Button
                            classes="max-h-[40px] px-6 text-sm"
                            text="Add Patient"
                            type="primary"
                            onClick={() => {
                                handleAddPatinet()
                            }}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PatientActions
