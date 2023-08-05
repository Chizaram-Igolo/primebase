import { z } from "zod";

export const dataSchema = z.object({
  ID: z.string(),
  TRANSACTION_ID: z.string(),
  FULL_NAME: z.string(),
  LOAN_AMOUNT: z.string(),
  REPAYMENT_DURATION: z.string(),
  CREATED_TIME: z.string(),
});

export type Data = z.infer<typeof dataSchema>;
