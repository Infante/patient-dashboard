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

// Define City type
export type City = {
    value: string
    label: string
}

export function CityFilter({
    cities,
    onSelectStatus,
}: {
    cities: City[]
    onSelectStatus: (status: string) => void
}) {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedCity, setSelectedCity] = useState<City | null>(null)

    useEffect(() => {
        // If a city is selected, call the onSelectStatus function
        if (selectedCity) {
            onSelectStatus(selectedCity.value)
        }
        // If no city is selected or "all" is selected, call the onSelectStatus function with a value of "all"
        else {
            onSelectStatus("all")
        }
    }, [selectedCity])

    return (
        <div className="bg-white flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto w-[150px] justify-start shadow-sm border-stroke"
                    >
                        {selectedCity ? (
                            <>{selectedCity.label}</>
                        ) : (
                            <>+ Filter by City</>
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
                                            setSelectedCity(null)
                                            setOpen(false)
                                        }}
                                    >
                                        <span>All</span>
                                    </CommandItem>
                                }

                                {cities.map((city) => (
                                    <CommandItem
                                        key={city.value}
                                        value={city.value}
                                        onSelect={(value) => {
                                            // Set selected city to the city that was clicked from the list
                                            setSelectedCity(
                                                cities.find(
                                                    (city) =>
                                                        city.value === value
                                                ) || null
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        <span>{city.label}</span>
                                    </CommandItem>
                                ))}

                                {/* {statuses.map((status) => (
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
                                ))} */}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
