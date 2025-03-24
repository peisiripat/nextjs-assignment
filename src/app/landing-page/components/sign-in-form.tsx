"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { onSignInSubmit } from "./sign-in-form-submit";
import { SignInSchema, SignInSchemaType } from "./sign-in-form-schema";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export interface SignInFormProps {
  onSubmitCallBack: void;
}

export default function SignInForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(onSignInSubmit, {
    message: "",
  });
  const signInFormRef = useRef<HTMLFormElement>(null);

  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { username: "", ...(state?.fields ?? {}) },
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
        className="flex flex-col gap-4 mx-10 my-4"
        action={formAction}
        onSubmit={handleSubmit(() => signInFormRef.current?.submit())}
      >
        <TextField
          {...register("username")}
          label="username"
          className="text-field"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          {...register("password")}
          label="password"
          className="text-field"
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {state.message !== "" && !isDirty && (
          <div className="text-red-500"> {state.message}</div>
        )}

        <Button
          disabled={isPending}
          onClick={() => handleSubmit}
          className="self-end w-24 px-10 bg-grey text-white"
          type="submit"
        >
          submit
        </Button>
      </form>
    </Card>
  );
}
