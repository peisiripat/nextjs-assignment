"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, useRef } from "react";
import {
  CustomerInfoState,
  onCustomerInfoSubmit,
} from "./customer-info-form-submit";
import {
  CustomerDataSchemaType,
  CustomerInfoSchema,
} from "./customer-info-form-schema";

export interface CustomerInfoFormProps {
  onSuccessCallBack: (data: CustomerInfoState) => void;
  initValues?: CustomerInfoState;
}

export default function CustomerInfoForm({
  onSuccessCallBack,
  initValues,
}: CustomerInfoFormProps) {
  const [state, formAction, isPending] = useActionState(onCustomerInfoSubmit, {
    message: "",
  });
  const signInFormRef = useRef<HTMLFormElement>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CustomerDataSchemaType>({
    resolver: zodResolver(CustomerInfoSchema),
    defaultValues: {
      name: "",
      ...(state?.fields ?? {}),
      ...(initValues?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state.isSuccess) {
      console.log(state);
      console.log("success, trigger redirect");
      onSuccessCallBack(state);
    }
  }, [onSuccessCallBack, state, state.isSuccess]);

  return (
    <div className="flex flex-col">
      <form
        ref={signInFormRef}
        className="grid grid-flow-col grid-rows-3 gap-4 py-4"
        action={formAction}
        onSubmit={handleSubmit(() => signInFormRef.current?.submit())}
      >
        <TextField
          required
          {...register("name")}
          label="name"
          className="text-field"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          required
          {...register("surname")}
          label="surname"
          className="text-field"
          error={!!errors.surname}
          helperText={errors.surname?.message}
        />

        <TextField
          required
          {...register("id")}
          label="id"
          className="text-field row-start-1"
          error={!!errors.id}
          helperText={errors.id?.message}
        />
        <TextField
          required
          {...register("bankAccount")}
          label="bankAccount"
          className="text-field row-start-2"
          error={!!errors.bankAccount}
          helperText={errors.bankAccount?.message}
        />

        {state.message !== "" && (
          <div className="text-red-500"> {state.message}</div>
        )}
        <div className="flex flex-row justify-end">
          <Button
            disabled={isPending}
            onClick={() => handleSubmit}
            className="w-24  py-4 col-start-1"
            type="submit"
          >
            back
          </Button>
          <Button
            disabled={isPending}
            onClick={() => handleSubmit}
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
