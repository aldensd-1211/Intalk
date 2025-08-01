"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";
import { useUser } from "@/app/provider";
import PayButton from "./_components/PayButton";

export default function Billing() {
  const { user } = useUser();

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mx-auto grid max-w-6xl gap-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back, {user?.name || "User"}
          </h1>
          <p className="text-muted-foreground">
            AI-Driven Interviews, Hassle-Free Hiring
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Your Credits */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Your Credits</CardTitle>
              <CardDescription>
                Current usage and remaining credits
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xl font-bold">3 interviews left</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add More Credits
              </Button>
            </CardContent>
          </Card>

          {/* Purchase Credits */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Purchase Credits</CardTitle>
              <CardDescription>
                Add more interview credits to your account
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-2 md:grid-cols-3">
              {[
                {
                  title: "Basic",
                  price: "₹420",
                  amount: 5,
                  credits: 20,
                  interviews: "20 interviews",
                  features: ["Basic interview templates", "Email support"],
                },
                {
                  title: "Standard",
                  price: "₹840",
                  amount: 10,
                  credits: 50,
                  interviews: "50 interviews",
                  features: [
                    "All interview templates",
                    "Priority support",
                    "Basic analytics",
                  ],
                },
                {
                  title: "Pro",
                  price: "₹2100",
                  amount: 25,
                  credits: 120,
                  interviews: "120 interviews",
                  features: [
                    "All interview templates",
                    "24/7 support",
                    "Advanced analytics",
                  ],
                },
              ].map((plan, idx) => (
                <Card
                  key={idx}
                  className="border-blue-200 flex flex-col justify-between"
                >
                  <CardHeader className="h-4">
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xl font-bold">{plan.price}</div>
                      <p className="text-sm text-muted-foreground">
                        {plan.interviews}
                      </p>
                      <ul className="mt-2 grid gap-2 text-sm">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="h-7 items-end justify-center">
                    <PayButton amount={plan.amount} credits={plan.credits} />
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
