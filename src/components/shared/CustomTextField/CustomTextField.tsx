import { TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

export default function CustomTextField({ label, variant }: TextFieldProps) {
  const [textValue, setTextValue] = useState<string>("");

  const onTextChange = (e: unknown) => setTextValue(e.target.value);

  return (
    <Controller
      name={label}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
