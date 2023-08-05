"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/registry/new-york/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef, useState } from "react";
// import axios from "axios";
import useAxios from "axios-hooks";

const profileFormSchema = z.object({
  fullName: z
    .string({
      required_error: "Please enter a name.",
    })
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  loanAmount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number({
      required_error: "Please enter an amount.",
    })
  ),
  repaymentDuration: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number({
      required_error: "Please enter an amount.",
    })
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface IFormData {
  fullName: string;
  loanAmount: number;
  repaymentDuration: number;
}

const defaultValues: Partial<ProfileFormValues> = {
  fullName: "",
  loanAmount: 0,
  repaymentDuration: 0,
};

type SignUpResponse = {
  success: boolean;
};

// const client = axios.create({
//   baseURL: "https://okigwecreations.online/api/",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });

// async function requestForLoan(formData: IFormData) {
//   let response = await client.post("", {
//     action: "get_all_loan_request",
// full_name: formData.fullName,
// loan_amount: formData.loanAmount.toString(),
// repayment_duration: formData.repaymentDuration.toString(),
//   });

//   return response;
// }

export function ProfileForm() {
  // const [{ data, loading, error }, submit] = useAxios<SignUpResponse>(
  //   {
  //     url: "https://okigwecreations.online/api/",
  //     method: "POST",
  //   },
  //   {
  //     manual: true,
  //   }
  // );

  const [open, setOpen] = useState(false);
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData();

    let full_name = data.fullName;
    let loan_amount = data.loanAmount.toFixed(2);
    let repayment_duration = data.repaymentDuration.toString();

    console.log(typeof loan_amount);

    formData.append("action", "request_for_loan");
    formData.append("full_name", full_name);
    formData.append("loan_amount", loan_amount);
    formData.append("repayment_duration", repayment_duration);

    // @ts-ignore
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    fetch("https://okigwecreations.online/api/", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    }).then((response) => console.log(response));

    form.reset();
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      eventDateRef.current = timeNow();
      setOpen(true);
    }, 100);
  }

  return (
    <Toast.Provider swipeDirection="up">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of the individual or company making the loan
                  request.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} type="number" />
                </FormControl>
                <FormDescription>How much you are requesting.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repaymentDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repayment Duration</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} type="number" />
                </FormControl>
                <FormDescription>
                  How long it will take you to pay back the loan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Request for Loan</Button>
        </form>
      </Form>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">
          Loan Request Successful
        </Toast.Title>
        <Toast.Description asChild>
          <time
            className="ToastDescription"
            dateTime={eventDateRef.current.toISOString()}
          >
            {prettyDate(eventDateRef.current)}
          </time>
        </Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="Button small green">Close</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}

function timeNow() {
  const now = new Date();
  return now;
}

function prettyDate(date: number | Date | undefined) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
