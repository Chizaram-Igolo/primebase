"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/registry/new-york/ui/badge";
import { Checkbox } from "@/registry/new-york/ui/checkbox";

import { Data } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDate, formatToCurrency, toTitleCase } from "@/lib/utils";
import Link from "next/link";

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/repayment",
          query: {
            transaction_id: row.getValue("TRANSACTION_ID"),
            full_name: row.getValue("FULL_NAME"),
            created_time: row.getValue("CREATED_TIME"),
            loan_amount: row.getValue("LOAN_AMOUNT"),
          },
        }}
      >
        <div className="w-[80px] px-4">{row.getValue("ID")}</div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "TRANSACTION_ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/repayment",
          query: {
            transaction_id: row.getValue("TRANSACTION_ID"),
            full_name: row.getValue("FULL_NAME"),
            created_time: row.getValue("CREATED_TIME"),
            loan_amount: row.getValue("LOAN_AMOUNT"),
          },
        }}
      >
        <div>{row.getValue("TRANSACTION_ID")}</div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "FULL_NAME",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/repayment",
          query: {
            transaction_id: row.getValue("TRANSACTION_ID"),
            full_name: row.getValue("FULL_NAME"),
            created_time: row.getValue("CREATED_TIME"),
            loan_amount: row.getValue("LOAN_AMOUNT"),
          },
        }}
      >
        <div>
          {toTitleCase(row.getValue("FULL_NAME")) || (
            <em>
              <span className="text-xs text-slate-400">no name provided</span>
            </em>
          )}
        </div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return row.original.FULL_NAME.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "LOAN_AMOUNT",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Amount (₦)" />
    ),
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/repayment",
          query: {
            transaction_id: row.getValue("TRANSACTION_ID"),
            full_name: row.getValue("FULL_NAME"),
            created_time: row.getValue("CREATED_TIME"),
            loan_amount: row.getValue("LOAN_AMOUNT"),
          },
        }}
      >
        <div>{formatToCurrency(row.getValue("LOAN_AMOUNT"))}</div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "REPAYMENT_DURATION",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Repayment Durations (Months)"
      />
    ),
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/repayment",
          query: {
            transaction_id: row.getValue("TRANSACTION_ID"),
            full_name: row.getValue("FULL_NAME"),
            created_time: row.getValue("CREATED_TIME"),
            loan_amount: row.getValue("LOAN_AMOUNT"),
          },
        }}
      >
        <div className="cursor-pointer text-center">
          {row.getValue("REPAYMENT_DURATION")}
        </div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "CREATED_TIME",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Time" />
    ),
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/repayment",
          query: {
            transaction_id: row.getValue("TRANSACTION_ID"),
            full_name: row.getValue("FULL_NAME"),
            created_time: row.getValue("CREATED_TIME"),
            loan_amount: row.getValue("LOAN_AMOUNT"),
          },
        }}
      >
        <div className="cursor-pointer text-[13px]">
          {formatDate(row.getValue("CREATED_TIME"))}
        </div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: true,
  },
];
