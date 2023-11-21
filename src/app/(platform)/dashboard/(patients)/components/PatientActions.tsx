// PatientActions
// Patient page actions, such as adding new patient, deleting, updating columns, etc.
"use client"
import { useState } from "react"

// Import components
import AddressGroup from "./AddressGroup"
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
import { Patient } from "../Columns"

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
        const newPatient: Patient = {
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
