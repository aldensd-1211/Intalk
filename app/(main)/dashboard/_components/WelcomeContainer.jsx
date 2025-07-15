"use client";
import { useUser } from "@/app/provider";
import React from "react";

function WelcomeContainer() {
  const { user } = useUser() || {};
  return (
    <div>
      <div>
        <h2>Welcome Back, {user?.name}</h2>
      </div>
    </div>
  );
}

export default WelcomeContainer;
