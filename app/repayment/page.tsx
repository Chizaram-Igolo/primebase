// "use client";

import { promises as fs } from "fs";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { Data, dataSchema } from "./data/schema";

import axios from "axios";
import Link from "next/link";
import { Separator } from "@/registry/new-york/ui/separator";
import { formatDate, formatToCurrency, toTitleCase } from "@/lib/utils";

interface ISearchParams {
  transaction_id: string;
  full_name: string;
  created_time: string;
  loan_amount: string;
}

const client = axios.create({
  baseURL: "https://okigwecreations.online/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

async function getRepaymentBreakdown(transaction_id: string) {
  let response = await client.post("", {
    action: "get_repayment_schedule",
    transaction_id: transaction_id,
  });

  let resp = z.array(dataSchema).parse(response.data.data);

  return resp;
}

export default async function RepaymentBreakdownPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: ISearchParams | undefined;
}) {
  let data: Data[] = [];

  data = await getRepaymentBreakdown(searchParams?.transaction_id || "");

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 py-6 md:flex min-w-[800px]">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <div className="inline-flex items-center rounded-lg bg-muted mb-4 px-3 py-1 text-sm font-medium">
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
              <span className="sm:hidden">Style, a new CLI and more.</span>
              <span className="hidden sm:inline">PrimeBase Microfinance</span>
              &nbsp;&nbsp;
              <Link href="/" className="underline">
                Go Home
              </Link>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight">
              Repayment Breakdown
            </h2>
            <p className="text-muted-foreground">
              <span>
                Here&apos;s the <strong>repayment breakdown</strong> of{" "}
                <strong>
                  ₦{formatToCurrency(searchParams?.loan_amount || "")}
                </strong>{" "}
                by{" "}
              </span>
              <span>
                <strong>{toTitleCase(searchParams?.full_name || "")}</strong>{" "}
                with{" "}
              </span>
              <span>transaction id: </span>
              <strong>
                <code>{searchParams?.transaction_id}</code>
              </strong>
              , requested on{" "}
              <strong>
                <span className="text-sm">
                  {formatDate(searchParams?.created_time || "")}
                </span>
              </strong>
            </p>
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
