"use client"
//  PatientProfile component
// Side Sheet displaying the patient profile and allowing user to edit patient details.

// Imports
import { useEffect, useState } from "react"
import { HiPlusSm, HiMinusSm } from "react-icons/hi"

// Import components
import Button from "@/components/Button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Patient } from "../Columns"
import AddressGroup from "./AddressGroup"

// Patient Profile component
const PatientProfile = ({
    isOpen,
    setIsOpen,
    patient,
}: {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    patient: Patient | null
}) => {
    // Form States
    const [name, setName] = useState<string>(patient?.name || "")
    const [dob, setDob] = useState<Date>(patient?.dob || new Date())
    const [status, setStatus] = useState<
        "active" | "churned" | "inquiry" | "onboarding"
    >(patient?.status || "inquiry")
    const [addresses, setAddresses] = useState<
        {
            street: string
            city: string
            state: string
            zip: string
        }[]
    >(patient?.addresses || [])

    // On patient change, update form states
    useEffect(() => {
        setError("")
        setName(patient?.name || "")
        setDob(patient?.dob || new Date())
        setStatus(patient?.status || "inquiry")
        setAddresses(patient?.addresses || [])
    }, [patient])

    // Error States
    const [error, setError] = useState<string>("")

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

    // Form submit handler
    const handleUpdatePatient = async () => {
        // Create patient object
        const updatedPatient: Patient = {
            ...patient,
            name,
            dob,
            status,
            addresses,
        }

        // Validate patient object

        // Check if patient name is empty
        if (!updatedPatient.name) {
            setError("Please enter the name of the patient.")
            return
        }

        // Check if patient dob is empty
        if (!updatedPatient.dob) {
            setError("Please select a birthday.")
            return
        }

        // Check if patient status is empty
        if (!updatedPatient.status) {
            setError("Please select a patient status.")
            return
        }

        // Check if patient addresses is empty
        if (
            !updatedPatient.addresses ||
            updatedPatient.addresses.length === 0
        ) {
            setError("Please enter at least one address.")
            return
        }

        setError("")
        // Update patient in database
        console.log(updatedPatient)
    }

    // Render
    return (
        <Sheet
            open={isOpen && !!patient}
            onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
        >
            <SheetContent className="px-8 md:min-w-[600px] w-[100%]">
                <SheetHeader>
                    <div className="py-4 flex flex-row items-center space-x-4">
                        {/* Profile Image */}
                        <div className="w-[60px] h-[60px] rounded-md bg-[#ED762F] flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">
                                {name
                                    ?.split(" ")
                                    .map((name) => name[0])
                                    .join("")}
                            </span>
                        </div>

                        <div>
                            {/* Name */}
                            <h1 className="font-bold text-2xl">
                                {patient?.name}
                            </h1>
                            <p className="text-sm text-light">
                                {/* Get age from DOB */}
                                {patient?.dob &&
                                    new Date().getFullYear() -
                                        new Date(
                                            patient?.dob
                                        ).getFullYear()}{" "}
                                years old
                            </p>
                        </div>

                        <div className="flex-1 flex justify-end">
                            <Button
                                classes="max-h-[40px] px-6 text-sm"
                                text="Save Changes"
                                type="primary"
                                onClick={handleUpdatePatient}
                            />
                        </div>
                    </div>
                </SheetHeader>

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleUpdatePatient()
                    }}
                    className="py-4 flex flex-col gap-4"
                >
                    {/* Notes */}
                    <div className="flex flex-col gap-2">
                        <textarea
                            className={`p-2 text-sm rounded-md border border-stroke focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]`}
                            name="notes"
                            placeholder="Notes"
                        ></textarea>
                    </div>

                    <h5 className="mt-2 font-bold text-sm">Patient Details</h5>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Status</label>
                        <select
                            className={`flex-1 p-2 text-sm rounded-md border border-stroke focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]`}
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
                            <option value="onboarding">Onboarding</option>
                            <option value="active">Active</option>
                            <option value="churned">Churned</option>
                        </select>
                    </div>

                    {/* Dob */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Birthday</label>
                        <input
                            className={`flex-1 p-2 text-sm rounded-md border border-stroke focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]`}
                            type="date"
                            name="dob"
                            value={dob.toISOString().split("T")[0]}
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                                setDob(new Date(e.target.value))
                            }}
                        />
                    </div>

                    {/* Addresses */}
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
                                    setAddressAtIndex={setAddressAtIndex}
                                />

                                {/* Remove address group for extra addresses */}
                                {index > 0 && (
                                    <div className="float-left">
                                        <Button
                                            classes="bg-transparent border-none text-sm pl-0 text-light underline text-rose-500"
                                            text="Remove Address"
                                            type="secondary"
                                            icon={
                                                <HiMinusSm className="text-xl" />
                                            }
                                            onClick={() => {
                                                setAddresses(
                                                    addresses.filter(
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        )
                    })}

                    {/* Add new address button */}
                    <div className="-mt-2">
                        <Button
                            classes="bg-transparent border-none text-sm pl-0 text-light underline"
                            text="Add Other Address"
                            type="secondary"
                            icon={<HiPlusSm className="text-xl" />}
                            onClick={() => {
                                setAddresses([
                                    ...addresses,
                                    {
                                        street: "",
                                        city: "",
                                        state: "AL",
                                        zip: "",
                                    },
                                ])
                            }}
                        />
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}

// Export
export default PatientProfile
