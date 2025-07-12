"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

const page = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000", // ✅ or your production domain
      },
    });
    if (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-4">
        <Image src={"/logo.png"} alt="logo" width={130} height={130} />
        <div className="flex items-center flex-col mt-4">
          <Image
            src={"/login.jpg"}
            alt="login"
            width={500}
            height={400}
            className="w-[380px] h-[300px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to Intalk
          </h2>
          <p className="text-gray-500 text-center">
            Sign In With Google Authentication
          </p>
          <Button onClick={signInWithGoogle} className="mt-6 w-full">
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
