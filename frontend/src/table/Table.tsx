import * as React from "react";
import {useState} from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from "@tanstack/react-table";
import {Person} from '../types.ts'
import "../index.css"

type TableProps = {
    personData: Person[];
}
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

const Table: React.FC<TableProps> = (props: TableProps) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const { personData } = props;


    const table = useReactTable({
        data: personData,
        columns,
        state: {
            columnFilters: columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    const handleFilterChange = (columnId: string, value: string | number) => {
        const filterValue = columnId === 'age' ? value === '' ? undefined : Number(value) : value;
        table.getColumn(columnId)?.setFilterValue(filterValue);
    }

    return (
        <div>
            <div style={{marginBottom: "1rem", display: "flex", gap: "1rem"}}>
                <input
                    type="text"
                    placeholder="Filter by name"
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    style={{padding: "0.5rem"}}
                    disabled={personData.length == 0}

                />
                <input
                    type="text"
                    placeholder="Filter by age"
                    onChange={(e) => handleFilterChange("age", e.target.value)}
                    style={{padding: "0.5rem"}}
                    disabled={personData.length == 0}
                />
                <input
                    type="text"
                    placeholder="Filter by country"
                    onChange={(e) => handleFilterChange("country", e.target.value)}
                    style={{padding: "0.5rem"}}
                    disabled={personData.length == 0}
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