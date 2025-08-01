import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";

function PayButton({ amount, credits }) {
  const { user } = useUser();

  const onPaymentSuccess = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) + credits })
      .eq("email", user?.email)
      .select();

    toast("Credits Updated!");
    window.location.reload();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Buy Credits</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm w-full p-4">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              <div className="mt-4 w-full">
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    height: 35,
                    label: "pay",
                  }}
                  onApprove={() => onPaymentSuccess()}
                  onCancel={() => toast("Payment Cancelled!")}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: amount,
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PayButton;
