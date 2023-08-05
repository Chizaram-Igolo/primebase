"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Data } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { formatToCurrency } from "@/lib/utils";

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] px-4 cursor-pointer">{row.getValue("ID")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "LOAN_BALANCE",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Balance (₦)" />
    ),
    cell: ({ row }) => (
      <div className="cursor-pointer">
        {formatToCurrency(row.getValue("LOAN_BALANCE"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return row.original.LOAN_BALANCE.toLowerCase().includes(
        value.toLowerCase()
      );
    },
  },
  {
    accessorKey: "MONTH_COUNT",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Month Count" />
    ),
    cell: ({ row }) => (
      <div className="cursor-pointer text-center">
        {row.getValue("MONTH_COUNT")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "EXPECTED_REPAYMENT_AMOUNT",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Exp. Repayment Amount (₦)"
      />
    ),
    cell: ({ row }) => (
      <div className="cursor-pointer text-center">
        {formatToCurrency(row.getValue("EXPECTED_REPAYMENT_AMOUNT"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "INTEREST",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interest (₦)" />
    ),
    cell: ({ row }) => (
      <div className="cursor-pointer text-center">
        {formatToCurrency(row.getValue("INTEREST"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      console.log("row", id);
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "TOTAL_REPAYMENT_AMOUNT",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Repayment Amount (₦)"
      />
    ),
    cell: ({ row }) => (
      <div className="cursor-pointer text-center">
        {formatToCurrency(row.getValue("TOTAL_REPAYMENT_AMOUNT"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      console.log("row", id);
      return value.includes(row.getValue(id));
    },
  },
];
