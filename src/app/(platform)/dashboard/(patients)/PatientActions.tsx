// PatientActions
// Patient page actions, such as add new patient, export, etc.
"use client"

// Import icons
import { HiOutlineDocumentDownload } from "react-icons/hi"

// Import components
import Button from "@/components/Button"

const PatientActions = () => {
    return (
        <>
            <Button
                icon={
                    <HiOutlineDocumentDownload className="text-xl text-black" />
                }
                classes="max-h-[40px] px-6 text-sm"
                text="Export"
                type="secondary"
                onClick={() => {}}
            />
            <Button
                classes="max-h-[40px] px-6 text-sm"
                text="Add Patient"
                type="primary"
                onClick={() => {}}
            />
        </>
    )
}

export default PatientActions
