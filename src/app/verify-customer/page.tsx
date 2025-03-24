"use client";

import { Button, Card } from "@mui/material";
import { useState } from "react";
import HeaderNav from "./components/headerNav";
import CustomerInfoForm from "./components/customer-info-form/customer-info-form";

export default function VerifyCustomerPage() {
  const steps = ["Customer Data", "Upload Documents", "Verify Data"];

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep == 0) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function renderStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <CustomerInfoForm />;
      default:
        return;
    }
  }

  return (
    <div>
      <h1>verify customer step</h1>
      <div className="px-4">
        <HeaderNav steps={steps} activeStep={activeStep} />
      </div>

      <Card className="bg-transparent p-4 m-4">
        <div className="grid grid-cols2"></div>
        {renderStep(activeStep)}
        <Button onClick={handleBack}>back</Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Card>
    </div>
  );
}
