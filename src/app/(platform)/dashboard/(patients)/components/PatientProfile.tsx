"use client"
//  PatientProfile component
// Side Sheet displaying the patient profile and allowing user to edit patient details.

// Imports
import { useEffect, useState } from "react"
import { HiPlusSm, HiMinusSm } from "react-icons/hi"
import toast from "react-hot-toast"

// Import components and types
import Button from "@/components/Button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import AddressGroup from "./AddressGroup"
import ExtraFieldGroup from "./ExtraFieldGroup"
import { Patient } from "@/hooks/usePatients"
import { useAuth } from "@/contexts/AuthContext"
import { useUpdatePatient, useDeletePatient } from "@/hooks/usePatients"

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
    const [notes, setNotes] = useState<string>(patient?.notes || "")
    const [extraFields, setExtraFields] = useState<
        {
            name: string
            value: string
            type: "string" | "number" | "date"
        }[]
    >(patient?.extra || [])

    // Update patient mutation
    const { token } = useAuth()
    const { mutateAsync: updatePatient, isPending: isPendingEdit } =
        useUpdatePatient(token)
    const { mutateAsync: deletePatient, isPending: isPendingDelete } =
        useDeletePatient(token)

    // On patient change, update form states
    useEffect(() => {
        setName(patient?.name || "")
        setDob(patient?.dob || new Date())
        setStatus(patient?.status || "inquiry")
        setAddresses(patient?.addresses || [])
        setNotes(patient?.notes || "")
        setExtraFields(patient?.extra || [])
    }, [patient])

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

    // Handler to update a specific extra field at an index
    const setExtraFieldAtIndex = (
        index: number,
        newExtraField: {
            name: string
            value: string
            type: "string" | "number" | "date"
        }
    ) => {
        setExtraFields(
            extraFields.map((field, i) => (i === index ? newExtraField : field))
        )
    }

    // Form submit handler
    const handleUpdatePatient = async () => {
        try {
            // Create patient object
            const updatedPatient: Patient = {
                ...patient,
                name,
                dob,
                status,
                addresses,
                notes,
                extra: extraFields,
            }

            // Validate patient object

            // Check if patient name is empty
            if (!updatedPatient.name) {
                toast.error("Please enter a patient name.")
                return
            }

            // Check if patient dob is empty
            if (!updatedPatient.dob) {
                toast.error("Please select a birthday.")
                return
            }

            // Check if patient status is empty
            if (!updatedPatient.status) {
                toast.error("Please select a status.")
                return
            }

            // Check if patient addresses is empty
            if (
                !updatedPatient.addresses ||
                updatedPatient.addresses.length === 0
            ) {
                toast.error("Please enter at least one address.")
                return
            }

            // Validate addresses
            for (const address of updatedPatient.addresses) {
                // Check if street is empty
                if (!address.street) {
                    toast.error("Please enter a street.")
                    return
                }

                // Check if city is empty
                if (!address.city) {
                    toast.error("Please enter a city.")
                    return
                }

                // Check if state is empty
                if (!address.state) {
                    toast.error("Please enter a state.")
                    return
                }

                // Check if zip is empty
                if (!address.zip) {
                    toast.error("Please enter a zip code.")
                    return
                }
            }

            // Validate extra fields
            for (const field of extraFields) {
                // Check if name is empty
                if (!field.name) {
                    toast.error("Please enter a field name.")
                    return
                }

                // Check if value is empty
                if (!field.value) {
                    toast.error("Please enter a value.")
                    return
                }
            }

            // Update patient in database
            await updatePatient(updatedPatient)

            toast.success("Patient updated successfully.")
        } catch (error) {
            toast.error("Error updating patient.")
        }
    }

    const handleDeletePatient = async () => {
        try {
            if (!patient || !patient.id) return

            // Delete patient in database
            const confirmed = window.confirm(
                "Are you sure you want to delete this patient?"
            )

            if (!confirmed) return

            deletePatient(patient)

            setIsOpen(false)

            toast.success("Patient deleted successfully.")
        } catch (error) {
            toast.error("Error deleting patient.")
        }
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
                        <div className="w-[60px] h-[60px] rounded-full bg-[#ED762F] flex items-center justify-center">
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
                            {/* Delete */}
                            <Button
                                classes="max-h-[40px] px-6 text-sm mr-2"
                                text="Delete"
                                type="secondary"
                                onClick={() => {
                                    // Delete patient
                                    handleDeletePatient()
                                }}
                                loading={isPendingDelete || isPendingEdit}
                            />

                            {/* Save Changes Button */}
                            <Button
                                classes="max-h-[40px] px-6 text-sm"
                                text="Save Changes"
                                type="primary"
                                onClick={handleUpdatePatient}
                                loading={isPendingEdit || isPendingDelete}
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
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
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
                            value={
                                new Date(dob).toISOString().split("T")[0] || ""
                            }
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                                setDob(new Date(e.target.value))
                            }}
                        />
                    </div>

                    {/* Extra details */}
                    <h5 className="mt-2 font-bold text-sm">Extra Details</h5>

                    {/* Render extra fields */}
                    {extraFields.map((extraField, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2">
                                {/* Extra Field */}
                                <ExtraFieldGroup
                                    key={index}
                                    extraField={extraField}
                                    index={index}
                                    setExtraFieldAtIndex={setExtraFieldAtIndex}
                                />

                                {/* Remove extra field button for extra fields */}
                                <div className="float-left">
                                    <Button
                                        classes="bg-transparent border-none text-sm pl-0 text-light underline text-rose-500"
                                        text="Remove Field"
                                        type="secondary"
                                        icon={<HiMinusSm className="text-xl" />}
                                        onClick={() => {
                                            setExtraFields(
                                                extraFields.filter(
                                                    (_, i) => i !== index
                                                )
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}

                    {/* Add new extra field button */}
                    <div className="-mt-2">
                        <Button
                            classes="bg-transparent border-none text-sm pl-0 text-light underline"
                            text="Add Extra Field"
                            type="secondary"
                            icon={<HiPlusSm className="text-xl" />}
                            onClick={() => {
                                setExtraFields([
                                    ...extraFields,
                                    {
                                        name: "",
                                        value: "",
                                        type: "string",
                                    },
                                ])
                            }}
                        />
                    </div>

                    {/* Addresses */}
                    {/* Render addresses */}
                    {addresses.map((address, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2">
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
                            </div>
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
