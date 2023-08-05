import { z } from "zod";

export const dataSchema = z.object({
  ID: z.string(),
  TRANSACTION_ID: z.string(),
  LOAN_BALANCE: z.string(),
  MONTH_COUNT: z.string(),
  EXPECTED_REPAYMENT_AMOUNT: z.string(),
  INTEREST: z.string(),
  TOTAL_REPAYMENT_AMOUNT: z.string(),
});

export type Data = z.infer<typeof dataSchema>;
