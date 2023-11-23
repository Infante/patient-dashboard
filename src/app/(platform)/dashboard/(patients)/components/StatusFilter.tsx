// Description: This component provides a status filter for the data table.
// It uses a popover to display a list of statuses which can be selected to filter the table data.
"use client"

// Imports
import { useEffect, useState } from "react"

// Import components
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Define status type
type Status = {
    value: string
    label: string
}

// Status filter options
const statuses: Status[] = [
    {
        value: "inquiry",
        label: "Inquiry",
    },
    {
        value: "onboarding",
        label: "Onboarding",
    },
    {
        value: "active",
        label: "Active",
    },
    {
        value: "churned",
        label: "Churned",
    },
]

export function StatusFilter({
    onSelectStatus,
}: {
    onSelectStatus: (status: string) => void
}) {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null)

    useEffect(() => {
        // If a status is selected, call the onSelectStatus callback with the status value
        if (selectedStatus) {
            onSelectStatus(selectedStatus.value)
        }
        // If no status is selected (not found or "all"), call the onSelectStatus callback with "all"
        else {
            onSelectStatus("all")
        }
    }, [selectedStatus])

    return (
        <div className="bg-white flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto w-[150px] justify-start shadow-sm border-stroke"
                    >
                        {selectedStatus ? (
                            <>{selectedStatus.label}</>
                        ) : (
                            <>+ Filter by Status</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {
                                    <CommandItem
                                        key="all"
                                        value="all"
                                        onSelect={(value) => {
                                            setSelectedStatus(null)
                                            setOpen(false)
                                        }}
                                    >
                                        <span>All</span>
                                    </CommandItem>
                                }
                                {statuses.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(value) => {
                                            setSelectedStatus(
                                                statuses.find(
                                                    (priority) =>
                                                        priority.value === value
                                                ) || null
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        <span>{status.label}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
