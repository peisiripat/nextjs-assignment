import { z } from "zod";

export const CustomerUploadFileSchema = z.object({
  file: z.array(
    z
      .instanceof(File)
      .refine(
        (file) => file.size < 2 * 1024 * 1024,
        "File size must be less than 2MB"
      )
      .refine((file) => file instanceof File && file.size > 0, {
        message: "File is required",
      })
      .refine((file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
          "application/pdf",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type)
      )
  ),
});

export type CustomerUploadFileSchemaType = z.infer<
  typeof CustomerUploadFileSchema
>;
