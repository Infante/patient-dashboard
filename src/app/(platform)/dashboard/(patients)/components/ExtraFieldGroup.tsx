// Imports
import Input from "@/components/Input"
import React, { useState, useEffect } from "react"

// Component Props Type
type ExtraField = {
    name: string
    value: string
    type: "string" | "number" | "date"
}

// Component for extra field group in patient form
const ExtraFieldGroup = ({
    extraField,
    index,
    setExtraFieldAtIndex,
}: {
    extraField: ExtraField
    index: number
    setExtraFieldAtIndex: (index: number, extraField: ExtraField) => void
}) => {
    const [localField, setLocalField] = useState(extraField)

    // Update the field when the original prop changes
    useEffect(() => {
        setLocalField(extraField)
    }, [extraField])

    // Handler to update individual extra field
    const updateField = (field: keyof ExtraField, value: string) => {
        const updatedField = { ...localField, [field]: value }
        setLocalField(updatedField)
        setExtraFieldAtIndex(index, updatedField)
    }

    return (
        <div className="flex flex-col gap-2">
            {/* Name */}
            <Input
                name={`extraFieldName-${index}`}
                placeholder="Field Name"
                type="text"
                value={localField.name}
                setValue={(newValue) => updateField("name", newValue)}
                required={true}
                classes="text-sm flex-1"
            />

            {/* Value */}
            <Input
                name={`extraFieldValue-${index}`}
                placeholder="Value"
                type={localField.type}
                value={localField.value}
                setValue={(newValue) => updateField("value", newValue)}
                required={true}
                classes="text-sm flex-1"
            />

            {/* Type */}
            <select
                className="flex-1 p-2 text-sm rounded-md border border-stroke focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]"
                name={`extraFieldType-${index}`}
                value={localField.type}
                onChange={(e) => updateField("type", e.target.value)}
            >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
            </select>
        </div>
    )
}

export default ExtraFieldGroup
