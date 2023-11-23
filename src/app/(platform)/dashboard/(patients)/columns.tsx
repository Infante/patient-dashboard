// Path: /components/Columns.tsx
// Description: Defines the column structure and types for the patient data table.
// This file contains the configuration for each column in the table used to display patient information.
"use client"

// Imports
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// Import components and types
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Patient } from "@/hooks/usePatients"

// Columns definitions for the patient table
export const columns: ColumnDef<Patient>[] = [
    // Name Column
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="p-0 text-light font-normal"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    // Status Column
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="p-0 text-light font-normal"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize font-medium">
                <span
                    className={`py-1 px-6 rounded-full ${
                        row.getValue("status") === "inquiry"
                            ? "bg-[#83C0D8]/40 text-[#74AABF]"
                            : row.getValue("status") === "churned"
                            ? "bg-[#d88383]/40 text-[#BF7474]"
                            : row.getValue("status") === "active"
                            ? "bg-[#ed762f]/40 text-[#D4692A]"
                            : row.getValue("status") === "onboarding"
                            ? "bg-[#44E747]/40 text-[#1D9F1F]"
                            : ""
                    }`}
                >
                    {row.getValue("status")}
                </span>
            </div>
        ),
        enableSorting: true,
    },
    //

    // Age Column
    {
        accessorKey: "age",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="p-0 text-light font-normal"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Age <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            // DOB
            const dob = new Date(row.original.dob)
            const age = Math.floor(
                (new Date().getTime() - dob.getTime()) / 31557600000
            )
            return <div>{age}</div>
        },
        enableSorting: true,
    },
    // Addresses Column
    {
        accessorKey: "addresses",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="p-0 text-light font-normal"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Addresses <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const addresses = row.getValue("addresses") as Patient["addresses"]
            return (
                <HoverCard>
                    <HoverCardTrigger className="flex flex-row items-center gap-2">
                        {addresses[0].street}, {addresses[0].city}
                        {addresses.length > 1 && (
                            <div className="w-[22px] h-[22px] rounded-full bg-[#ED762F] flex items-center justify-center text-white text-[10px]">
                                <span>+{addresses.length - 1}</span>
                            </div>
                        )}
                    </HoverCardTrigger>
                    <HoverCardContent className="flex flex-col gap-4">
                        {addresses.map(
                            ({ street, city, state, zip }, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-1 text-sm"
                                >
                                    {street} {city}, {state} {zip}
                                </div>
                            )
                        )}
                    </HoverCardContent>
                </HoverCard>
            )
        },
        enableSorting: true,
    },
    //
    {
        accessorKey: "extra",
        header: ({ column }) => <>Extra Fields</>,
        cell: ({ row }) => {
            let extraFields = row.original.extra ? row.original.extra : []
            return (
                <HoverCard>
                    <HoverCardTrigger className="flex flex-row items-center gap-2">
                        {extraFields[0].name}: {extraFields[0].value}
                        {extraFields.length > 1 && (
                            <div className="w-[22px] h-[22px] rounded-full bg-[#ED762F] flex items-center justify-center text-white text-[10px]">
                                <span>+{extraFields.length - 1}</span>
                            </div>
                        )}
                    </HoverCardTrigger>
                    <HoverCardContent className="flex flex-col gap-4">
                        {extraFields.map(({ name, value }, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-1 text-sm"
                            >
                                {name}: {value}
                            </div>
                        ))}
                    </HoverCardContent>
                </HoverCard>
            )
        },
        enableSorting: true,
    },
    // Hidden city column used for filtering
    {
        id: "city",
        accessorFn: (row) => {
            // Return a string of all the cities separated by a comma
            return row.addresses.map((address) => address.city).join(", ")
        },
        header: () => null,
        cell: () => null,
    },
]
