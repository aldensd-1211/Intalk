"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setformData] = useState();

  const onHandleInputChange = (field, value) => {
    setformData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  return (
    <div className="px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={3 * (100 / 3)} className="my-5" />
      <FormContainer onHandleInputChange={onHandleInputChange} />
    </div>
  );
}

export default CreateInterview;
