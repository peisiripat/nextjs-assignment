"use server";

import { SignInSchema } from "./sign-in-form-schema";

export type SigninFormState = {
  isSuccess?: boolean;
  message: string;
  fields?: Record<string, string>;
};
export async function onSignInSubmit(
  prevState: SigninFormState,
  data: FormData
): Promise<SigninFormState> {
  const formData = Object.fromEntries(data);
  const parsed = SignInSchema.safeParse(formData);

  if (parsed.success == false) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = formData[key].toString();
    }
    return { message: "invalid form data", fields: fields };
  }

  if (parsed.data.username != "admin") {
    return { message: "not authorized", fields: parsed.data };
  }

  return { isSuccess: true, message: "", fields: parsed.data };
}
