"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { createCheckoutSession } from "@/lib/stripe";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const BillingPage = () => {
  const { data: user } = api.project.getMyCredits.useQuery();
  const [creditToBuy, setCreditToBuy] = useState<number[]>([100]);
  const creditToBuyAmount = creditToBuy[0]!;
  const price = (creditToBuyAmount / 50).toFixed(2);

  return (
    <div>
      <h1 className="text-xl font-semibold">Billings</h1>
      <div className="h-2"></div>
      <p className="text-sm"> You currently have {user?.credits} credits</p>
      <div className="mt-10">
        <Slider
          defaultValue={[100]}
          max={1000}
          min={30}
          step={10}
          onValueChange={(value) => setCreditToBuy(value)}
          value={creditToBuy}
        />
      </div>

      <Button
        className="mt-2"
        onClick={() => {
          createCheckoutSession(creditToBuyAmount, user?.email!);
        }}
      >
        Buy {creditToBuy} credits for ${price}
      </Button>
    </div>
  );
};

export default BillingPage;
