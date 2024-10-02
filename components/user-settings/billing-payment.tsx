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
import { useState } from "react";
import { Input } from "../ui/input";
import { LuPencilLine } from "react-icons/lu";
import { Label } from "../ui/label";
import { Document, Documents } from "../documents-card";

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

const documents = ["Payment History", "Tax Information"];

export const BillingPayment = ({ user }: BillingPaymentProps) => {
  const [showFormButton, setShowFormButton] = useState<boolean>(false);
  const [activePayment, setActivePayment] = useState<string>(
    user.paymentMethod
  );
  const [showBillingAddress, setShowBillingAddress] = useState<boolean>(true);
  const [billingAddress, setBillingAddress] = useState<string>(
    user.billingAddress || ""
  );

  const handlePayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActivePayment(e.currentTarget.value);
    setShowFormButton(true);
  };

  const handleBillingAddress = () => {};
  const handleBillingAddressInput = () => {
    setShowFormButton(true);
    setShowBillingAddress(false);
  };

  const handleCancel = () => {
    setActivePayment(user.paymentMethod);
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
                // disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" form="form" size="sm">
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid md:grid-cols-2 gap-3">
          {paymentMethods.map((payment) => (
            <Button
              key={payment.value}
              variant={
                activePayment === payment.value ? "default" : "secondary"
              }
              value={payment.value}
              onClick={handlePayment}
            >
              {payment.label}
            </Button>
          ))}
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
            />
          </div>
        )}
        <form id="form" action="">
          <input type="hidden" value={activePayment} name="activePayment" />
          <input type="hidden" value={billingAddress} name="billingAddress" />
          <div></div>
        </form>
      </CardContent>
      <CardFooter className="pb-5">
        <ul className="w-full flex items-center justify-around">
          {documents.map((doc) => (
            <li key={doc} className="">
              <Document label={doc} />
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};
