"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, useState } from "react";
import {
  CustomerUploadFileState,
  onCustomerUploadFileSubmit,
} from "./upload-form-submit";
import {
  CustomerUploadFileSchema,
  CustomerUploadFileSchemaType,
} from "./upload-form-schema";

export interface CustomerUploadFileFormProps {
  onSuccessCallBack: (data: CustomerUploadFileState) => void;
  onBackCallBack: () => void;
  initValues?: CustomerUploadFileState;
}

export default function CustomerUploadFileForm({
  onSuccessCallBack,
  onBackCallBack,
  initValues,
}: CustomerUploadFileFormProps) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const [state, formAction, isPending] = useActionState(
    onCustomerUploadFileSubmit,
    {
      message: "",
    }
  );

  const {
    formState: { errors },
  } = useForm<CustomerUploadFileSchemaType>({
    resolver: zodResolver(CustomerUploadFileSchema),
    defaultValues: {
      ...(state?.fields ?? {}),
      ...(initValues?.fields ?? {}),
    },
  });

  function handleFileSubmit() {
    onSuccessCallBack(state);

    // if (!file) {
    //   console.error("No file selected");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("file", file);

    // onCustomerUploadFileSubmit(state, formData);
  }

  useEffect(() => {
    if (state.isSuccess) {
      onSuccessCallBack(state);
    }
  }, [onSuccessCallBack, state, state.isSuccess]);

  return (
    <div className="flex flex-col">
      <form
        // ref={signInFormRef}
        className="grid grid-flow-col grid-rows-3 gap-4 py-4"
        action={formAction}
        onSubmit={handleFileSubmit}
      >
        <TextField
          type="file"
          component="label"
          className="text-field"
          error={!!errors.file}
          onChange={handleFileChange}
        />

        {state.message !== "" && (
          <div className="text-red-500"> {state.message}</div>
        )}
        <div className="flex flex-row justify-end">
          <Button
            disabled={isPending}
            onClick={() => onBackCallBack()}
            className="w-24  py-4 col-start-1"
          >
            back
          </Button>
          <Button
            disabled={isPending}
            // onClick={() => handleSubmit}
            className="w-24  py-4 "
            type="submit"
          >
            next
          </Button>
        </div>
      </form>
    </div>
  );
}
