"use server";

import { CustomerUploadFileSchema } from "./upload-form-schema";

export type CustomerUploadFileState = {
  isSuccess?: boolean;
  message: string;
  fields?: Record<string, File>;
};
export async function onCustomerUploadFileSubmit(
  prevState: CustomerUploadFileState,
  data: FormData
): Promise<CustomerUploadFileState> {
  const formData = Object.fromEntries(data);
  console.log(formData);
  const parsed = CustomerUploadFileSchema.safeParse(formData);

  if (parsed.success == false) {
    const fields: Record<string, File> = {};
    for (const key of Object.keys(data)) {
      fields[key] = formData[key] as File;
    }
    return { message: "invalid form data", fields: fields };
  }

  // if (parsed.data.username != "admin") {
  //   return { message: "not authorized", fields: parsed.data };
  // }

  return {
    isSuccess: true,
    message: "",
    fields: parsed.data as unknown as Record<string, File>,
  };
}
