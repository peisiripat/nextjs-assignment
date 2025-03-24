"use client";
import { Step, StepLabel, Stepper } from "@mui/material";

export interface HeaderNavProps {
  steps: string[];
  activeStep: number;
}

export default function HeaderNav({ steps, activeStep }: HeaderNavProps) {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
