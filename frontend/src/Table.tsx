import * as React from "react";
import {
    ColumnDef, ColumnFiltersState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from "@tanstack/react-table";
import {Person} from './types'
import "./index.css"
import {useState} from "react";

const data: Person[] = [
    {name: "John Doe", age: 28, country: "USA"},
    {name: "Jane Smith", age: 34, country: "Canada"},
    {name: "David Brown", age: 45, country: "UK"},
    {name: "David Blue", age: 46, country: "UK"},
    {name: "David Green", age: 47, country: "Mexico"}
]

const columnHelper = createColumnHelper<Person>()

const columns: ColumnDef<Person, any>[] = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),

    }),
    columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => info.renderValue(),
        filterFn: (row, columnId, filterValue: string) => {
            const value = row.getValue<number>(columnId);
            return value.toString().startsWith(filterValue);
        }
    }),
    columnHelper.accessor("country", {
        header: () => "Country",
        cell: (info) => info.renderValue(),
    }),
];

const Table: React.FC = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        state: {
          columnFilters: columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    const handleFilterChange = (columnId: string, value: string | number ) => {
        const filterValue = columnId === 'age' ? value === '' ? undefined : Number(value) : value;
        table.getColumn(columnId)?.setFilterValue(filterValue);
    }

    return (
        <div>
            <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                <input
                    type="text"
                    placeholder="Filter by name"
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    style={{ padding: "0.5rem" }}
                />
                <input
                    type="text"
                    placeholder="Filter by age"
                    onChange={(e) => handleFilterChange("age", e.target.value)}
                    style={{ padding: "0.5rem" }}
                />
                <input
                    type="text"
                    placeholder="Filter by country"
                    onChange={(e) => handleFilterChange("country", e.target.value)}
                    style={{ padding: "0.5rem" }}
                />
            </div>
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>       {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;