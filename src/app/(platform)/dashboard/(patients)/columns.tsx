// Path: /components/Columns.tsx
// Description: Defines the column structure and types for the patient data table.
// This file contains the configuration for each column in the table used to display patient information.
"use client"

// Imports
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// Import components
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

// Defines the structure for patient data
export type Patient = {
    id: string
    status: "inquiry" | "churnned" | "active" | "onboarding"
    name: string
    dob: Date
    addresses: {
        street: string
        city: string
        state: string
        zip: string
    }[]
}

// Columns definitions for the patient table
export const columns: ColumnDef<Patient>[] = [
    // Select Column
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // Name Column
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="p-0"
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
                className="p-0"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
        enableSorting: true,
    },
    // Addresses Column
    {
        accessorKey: "addresses",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="p-0"
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
    // Actions Column
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <div className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-">
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Patient</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
]
