// Path: /components/StatusFilter.tsx
// Description: This component provides a status filter for the data table.
// It uses a popover to display a list of statuses which can be selected to filter the table data.
"use client"

// Imports
import { useState, useEffect } from "react"
import {
    ArrowUpCircle,
    CheckCircle2,
    Circle,
    HelpCircle,
    LucideIcon,
    XCircle,
} from "lucide-react"
import * as React from "react"

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
import { cn } from "@/lib/utils"

// Define status type
type Status = {
    value: string
    label: string
    icon: LucideIcon
}

// Status filter options
const statuses: Status[] = [
    {
        value: "all",
        label: "All",
        icon: CheckCircle2,
    },
    {
        value: "inquiry",
        label: "Inquiry",
        icon: HelpCircle,
    },
    {
        value: "onboarding",
        label: "Onboarding",
        icon: Circle,
    },
    {
        value: "active",
        label: "Active",
        icon: ArrowUpCircle,
    },
    {
        value: "churnned",
        label: "Churnned",
        icon: XCircle,
    },
]

export function StatusFilter({
    onSelectStatus,
}: {
    onSelectStatus: (status: string) => void
}) {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(
        statuses[0]
    )

    useEffect(() => {
        if (selectedStatus) {
            onSelectStatus(selectedStatus.value)
        }
    }, [selectedStatus])

    return (
        <div className="bg-white flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-[150px] justify-start"
                    >
                        {selectedStatus ? (
                            <>
                                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                                {selectedStatus.label}
                            </>
                        ) : (
                            <>+ Set status</>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
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
                                        <status.icon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                status.value ===
                                                    selectedStatus?.value
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            )}
                                        />
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
