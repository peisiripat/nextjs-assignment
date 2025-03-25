"use client";

import { Button, Card } from "@mui/material";
import { useState } from "react";
import HeaderNav from "./components/headerNav";
import CustomerInfoForm from "./components/customer-info-form/customer-info-form";
import { CustomerInfoState } from "./components/customer-info-form/customer-info-form-submit";
import CustomerUploadFileForm from "./components/upload-form/upload-form";
import { CustomerUploadFileState } from "./components/upload-form/upload-form-submit";

export default function VerifyCustomerPage() {
  const steps = ["Customer Data", "Upload Documents", "Verify Data"];

  const [activeStep, setActiveStep] = useState<number>(0);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoState>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function shouldDisableNextBtn() {
    switch (activeStep) {
      case 0:
        return customerInfo?.isSuccess != true;
        return false;
    }
  }

  const handleBack = () => {
    if (activeStep == 0) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function renderStep(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <CustomerInfoForm
            onSuccessCallBack={submitCustomerFormCallBack}
            initValues={customerInfo}
          />
        );
      case 1:
        return (
          <CustomerUploadFileForm
            onSuccessCallBack={submitFileFormCallBack}
            onBackCallBack={handleBack}
          />
        );
      default:
        return;
    }
  }

  function submitCustomerFormCallBack(state: CustomerInfoState) {
    setCustomerInfo({ fields: state.fields, message: "" });
    handleNext();
  }

  function submitFileFormCallBack(state: CustomerUploadFileState) {
    handleNext();
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
        {/* {activeStep != 0 && <Button onClick={handleBack}>back</Button>}
        <Button
          // disabled={shouldDisableNextBtn()}
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? "confirm" : "Next"}
        </Button> */}
      </Card>
    </div>
  );
}
