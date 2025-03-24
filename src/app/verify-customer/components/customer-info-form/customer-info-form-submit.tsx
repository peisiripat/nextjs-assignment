"use server";

import { CustomerInfoSchema } from "./customer-info-form-schema";

export type CustomerInfoState = {
  isSuccess?: boolean;
  message: string;
  fields?: Record<string, string>;
};
export async function onCustomerInfoSubmit(
  prevState: CustomerInfoState,
  data: FormData
): Promise<CustomerInfoState> {
  const formData = Object.fromEntries(data);
  const parsed = CustomerInfoSchema.safeParse(formData);

  if (parsed.success == false) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = formData[key].toString();
    }
    return { message: "invalid form data", fields: fields };
  }

  // if (parsed.data.username != "admin") {
  //   return { message: "not authorized", fields: parsed.data };
  // }

  return { isSuccess: true, message: "", fields: parsed.data };
}
