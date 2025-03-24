import { TellerAuth } from "@/types/user";
import { z } from "zod";

export const SignInSchema: z.ZodType<TellerAuth> = z.object({
  username: z.string().trim().min(1, { message: "username is required" }),
  password: z.string().trim().min(1, { message: "password is required" }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
