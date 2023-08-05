import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/registry/new-york/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import Link from "next/link";

const sidebarNavItems = [
  {
    title: "Make your loan request",
    href: "/request_loan",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6  p-8 py-6 pb-12 md:block min-w-[800px]">
        <div className="space-y-0.5">
          <div className="inline-flex items-center rounded-lg bg-muted mb-4 px-3 py-1 text-sm font-medium">
            🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span className="sm:hidden">Style, a new CLI and more.</span>
            <span className="hidden sm:inline">PrimeBase Microfinance</span>
            &nbsp;&nbsp;
            <Link href="/" className="underline">
              Go Home
            </Link>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Request for Loan
          </h2>
          <p className="text-muted-foreground">
            Please fill in the details of the loan request.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
