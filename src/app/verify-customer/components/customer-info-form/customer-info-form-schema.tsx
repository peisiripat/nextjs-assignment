import { CustomerData } from "@/types/customer";
import { z } from "zod";

function idCardCheck(idCardNumber: string): boolean {
  let sum = 0;
  for (let i = 0; i < idCardNumber.length - 1; i++) {
    sum += parseInt(idCardNumber[i]) * (13 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 10;

  if (checkDigit.toString() == idCardNumber[12]) {
    return true;
  } else {
    return false;
  }
}
export const CustomerInfoSchema: z.ZodType<CustomerData> = z.object({
  name: z.string().trim().min(1, { message: "name is required" }),
  surname: z.string().trim().min(1, { message: "surname is required" }),

  id: z
    .string()
    .trim()
    .length(13, { message: "id length must be 13" })
    .refine(
      (value) => /^[0-9]\d*$/.test(value ?? ""),
      "id format must contain only numbers"
    )
    .refine((value) => idCardCheck(value) == false, {
      message: "checksum is wrong",
    }),
  bankAccount: z.string().trim().min(1, { message: "bankAccount is required" }),
});

export type CustomerDataSchemaType = z.infer<typeof CustomerInfoSchema>;
