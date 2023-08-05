// "use client";

import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { dataSchema } from "./data/schema";

import axios from "axios";
import Link from "next/link";
import { Separator } from "@/registry/new-york/ui/separator";
import { Button } from "@/registry/new-york/ui/button";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

const client = axios.create({
  baseURL: "https://okigwecreations.online/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

async function getLoans() {
  let response = await client.post("", {
    action: "get_all_loan_request",
  });

  return z.array(dataSchema).parse(response.data.data);
}

export default async function LoanPage() {
  const data = await getLoans();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 py-6 md:flex min-w-[800px]">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <div className="inline-flex items-center rounded-lg bg-muted mb-4 px-3 py-1 text-sm font-medium">
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
              <span>PrimeBase Microfinance</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight">
              All Loan Requests
            </h2>
            <p className="text-muted-foreground ">
              Here&apos;s a list of <strong>all issued loans. </strong>
              <span className="mt-3 text-sm">
                Click on a loan entry to see its repayment breakdown.
              </span>
            </p>
            <div className="mt-3">
              <Link href="/request_loan">
                <Button type="button">Make a Loan Request</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}
