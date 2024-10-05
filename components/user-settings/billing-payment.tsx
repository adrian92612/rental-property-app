"use client";

import { User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Content,
} from "../ui/card";
import { Button } from "../ui/button";
import React, { useActionState, useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { LuPencilLine } from "react-icons/lu";
import { Label } from "../ui/label";
import { Document, Documents } from "../documents-card";
import { updateBillingPayment } from "@/lib/actions/actions";
import { useToast } from "@/hooks/use-toast";

type BillingPaymentProps = {
  user: User;
};

const paymentMethods = [
  {
    value: "card",
    label: "Credit/Debit Card",
  },
  {
    value: "bank",
    label: "Bank Transfer",
  },
  {
    value: "wallet",
    label: "Online Wallet",
  },
  {
    value: "crypto",
    label: "Cryptocurrency",
  },
];

const subscriptions = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "annual",
    label: "Annual",
  },
];

const documents = ["Payment History", "Tax Information"];

export const BillingPayment = ({ user }: BillingPaymentProps) => {
  const [state, action, isPending] = useActionState(updateBillingPayment, {
    success: false,
    message: "",
  });
  const [showFormButton, setShowFormButton] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>(
    user.paymentMethod
  );
  const [subscription, setSubscription] = useState<string>(user.subscription);
  const [showBillingAddress, setShowBillingAddress] = useState<boolean>(true);
  const [billingAddress, setBillingAddress] = useState<string>(
    user.billingAddress || ""
  );
  const { toast } = useToast();
  const handleToast = useCallback(() => {
    if (state.success) {
      setShowBillingAddress(true);
      setShowFormButton(false);
    }
    if (state.message) {
      toast({
        title: state.message,
      });
    }
  }, [state, toast]);

  useEffect(() => {
    handleToast();
  }, [handleToast]);

  const handlePayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPaymentMethod(e.currentTarget.value);
    setShowFormButton(true);
  };
  const handleSubscription = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSubscription(e.currentTarget.value);
    setShowFormButton(true);
  };

  const handleBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddress(e.target.value);
  };

  const handleBillingAddressInput = () => {
    setShowFormButton(true);
    setShowBillingAddress(false);
  };

  const handleCancel = () => {
    setPaymentMethod(user.paymentMethod);
    setSubscription(user.subscription);
    setBillingAddress(user.billingAddress || "");
    setShowBillingAddress(true);
    setShowFormButton(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between h-8">
          <CardTitle>Billing & Payment</CardTitle>
          {showFormButton && (
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="billingForm"
                size="sm"
                disabled={isPending}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <h2 className="font-bold mb-2">Payment Method</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {paymentMethods.map((payment) => (
              <Button
                key={payment.value}
                variant={
                  paymentMethod === payment.value ? "default" : "secondary"
                }
                value={payment.value}
                onClick={handlePayment}
                disabled={isPending}
              >
                {payment.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold mb-2">Subscription</h2>
          <div className="grid grid-cols-2 bg-secondary p-2 rounded-sm">
            {subscriptions.map((sub) => (
              <Button
                key={sub.value}
                variant={subscription === sub.value ? "default" : "secondary"}
                value={sub.value}
                onClick={handleSubscription}
                className="border-none shadow-none"
                disabled={isPending}
              >
                {sub.label}
              </Button>
            ))}
          </div>
        </div>

        {showBillingAddress ? (
          <div className="flex justify-between">
            <Content
              label="Billing Address:"
              value={user.billingAddress ?? "N/A"}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-2xl"
              onClick={handleBillingAddressInput}
              disabled={isPending}
            >
              <LuPencilLine />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 ">
            <Label
              htmlFor="billingAddress"
              className="text-nowrap font-montserrat font-bold text-base"
            >
              Billing Address:
            </Label>
            <Input
              id="billingAddress"
              value={billingAddress}
              onChange={handleBillingAddress}
              disabled={isPending}
            />
          </div>
        )}
        <form id="billingForm" action={action}>
          <input type="hidden" value={user.id} name="userId" />
          <input type="hidden" value={paymentMethod} name="paymentMethod" />
          <input type="hidden" value={subscription} name="subscription" />
          <input type="hidden" value={billingAddress} name="billingAddress" />
        </form>
      </CardContent>
      <CardFooter className="pb-5">
        <ul className="w-full flex items-center justify-around">
          {documents.map((doc) => (
            <li key={doc}>
              <Document label={doc} />
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};
