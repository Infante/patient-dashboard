// Path: /components/DataTable.tsx
// Description: This component renders a data table for displaying patient information.
// It includes features like sorting, filtering, and pagination, and integrates with
// a custom status filter for more refined data viewing.
"use client"

// Imports
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import * as React from "react"

// Import components
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Patient } from "../Columns"
import { StatusFilter } from "./StatusFilter"
import PatientProfile from "./PatientProfile"

// Export DataTable
export function DataTable({
    data,
    columns,
}: {
    data: Patient[]
    columns: ColumnDef<Patient>[]
}) {
    // State for the table
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    // State for the selected status filter
    const [selectedStatus, setSelectedStatus] = React.useState<string>("")

    // State for the patient profile
    const [patientProfileOpen, setPatientProfileOpen] = React.useState(false)
    const [patientProfileData, setPatientProfileData] =
        React.useState<Patient | null>(null)

    // Create the table
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters: selectedStatus
                ? [...columnFilters, { id: "status", value: selectedStatus }]
                : columnFilters, // Add status filter to column filters
            columnVisibility,
            rowSelection,
        },
    })

    // Filtering by status
    const handleStatusChange = (newStatus: string) => {
        if (newStatus === "all") {
            setSelectedStatus("")
            // Update the table filter
            setColumnFilters((oldFilters) =>
                oldFilters.filter((filter) => filter.id !== "status")
            )
        } else {
            setSelectedStatus(newStatus)
            // Update the table filter
            setColumnFilters((oldFilters) => [
                ...oldFilters.filter((filter) => filter.id !== "status"), // Remove existing status filter
                { id: "status", value: newStatus }, // Add new status filter
            ])
        }
    }

    return (
        <div className="w-full">
            <PatientProfile
                isOpen={patientProfileOpen}
                setIsOpen={setPatientProfileOpen}
                patient={patientProfileData}
            />
            <div className="flex flex-col md:flex-row md:items-center py-4">
                <Input
                    placeholder="Search Patients..."
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="md:mr-2 md:max-w-sm bg-white shadow-sm border-stroke focus:outline-none focus:ring-2 focus:ring-[#ED762F]/30 focus:border-[#ED762F]"
                />
                <div className="mt-2 md:mt-0 md:ml-auto flex flex-row space-x-2">
                    <StatusFilter onSelectStatus={handleStatusChange} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size={"sm"}
                                className="bg-white shadow-sm border-stroke"
                            >
                                Toggle Columns{" "}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                className="border-stroke"
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className="border-stroke"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        // Make all cells except checkbox clickable
                                        <TableCell
                                            key={cell.id}
                                            className={`${
                                                cell.column.id !== "select" &&
                                                "hover:cursor-pointer"
                                            }`}
                                            onClick={() => {
                                                if (cell.column.id === "select")
                                                    return
                                                setPatientProfileData(
                                                    row.original as Patient
                                                )
                                                setPatientProfileOpen(true)
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-xs text-light">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        className="bg-white shadow-sm border-stroke"
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        className="bg-white shadow-sm border-stroke"
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
