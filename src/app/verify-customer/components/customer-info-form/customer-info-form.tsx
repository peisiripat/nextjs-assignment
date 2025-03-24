"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { onCustomerInfoSubmit } from "./customer-info-form-submit";
import {
  CustomerDataSchemaType,
  CustomerInfoSchema,
} from "./customer-info-form-schema";

export interface CustomerInfoFormProps {
  onSubmitCallBack: void;
}

export default function CustomerInfoForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(onCustomerInfoSubmit, {
    message: "",
  });
  const signInFormRef = useRef<HTMLFormElement>(null);

  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm<CustomerDataSchemaType>({
    resolver: zodResolver(CustomerInfoSchema),
    defaultValues: { name: "", ...(state?.fields ?? {}) },
  });

  useEffect(() => {
    if (state.isSuccess) {
      console.log("success, trigger redirect");
      router.push("/verify-customer");
    }
  }, [router, state.isSuccess]);

  return (
    <Card className="bg-transparent p-4">
      <form
        ref={signInFormRef}
        className="grid grid-cols-2 gap-4"
        action={formAction}
        onSubmit={handleSubmit(() => signInFormRef.current?.submit())}
      >
        <TextField
          {...register("name")}
          label="name"
          className="text-field"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("surname")}
          label="surname"
          className="text-field"
          error={!!errors.surname}
          helperText={errors.surname?.message}
        />

        <TextField
          {...register("id")}
          label="id"
          className="text-field"
          error={!!errors.id}
          helperText={errors.id?.message}
        />
        <TextField
          {...register("bankAccount")}
          label="bankAccount"
          className="text-field col-start-1"
          error={!!errors.bankAccount}
          helperText={errors.bankAccount?.message}
        />

        {state.message !== "" && !isDirty && (
          <div className="text-red-500"> {state.message}</div>
        )}

        <Button
          disabled={isPending}
          onClick={() => handleSubmit}
          className="self-end w-24 px-10 bg-grey text-white  col-start-1"
          type="submit"
        >
          submit
        </Button>
      </form>
    </Card>
  );
}
