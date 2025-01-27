"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { createCheckoutSession } from "@/lib/stripe";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { toast } from "sonner";

const BillingPage = () => {
  const { data: user } = api.project.getMyCredits.useQuery();
  const [creditToBuy, setCreditToBuy] = useState<number[]>([100]);
  const creditToBuyAmount = creditToBuy[0]!;
  const price = (creditToBuyAmount / 50).toFixed(2);
  const { data: billingData } = api.transection.getAllTransections.useQuery();

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy: ", err);
      },
    );
  };

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

      <div className="mt-5">
        <div className="mt-5 space-y-4">
          {billingData &&
            billingData.map((datas, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="flex  justify-between space-y-0">
                  {/* Transaction ID */}
                  <div
                    className="cursor-pointer truncate text-sm font-bold text-gray-700 md:w-1/2"
                    title={datas?.id}
                    onClick={() => handleCopy(datas?.id)}
                  >
                    <span className="text-blue-500">ID:</span>{" "}
                    {datas?.id.slice(0, 15)}...
                  </div>

                  {/* Status Badge */}
                  <Badge
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      datas?.status === "INITIATED"
                        ? "bg-yellow-100 text-yellow-800"
                        : datas?.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : datas?.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : datas?.status === "FAILED"
                              ? "bg-gray-100 text-gray-800"
                              : ""
                    }`}
                  >
                    {datas?.status}
                  </Badge>
                </div>

                {/* Credits and Transaction Info */}
                <div className="mt-5 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Credits:</span>{" "}
                      {datas?.credit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-600">
                      <span className="font-semibold"></span>{" "}
                      {new Date(datas?.createdAt).toLocaleDateString()}{" "}
                      {new Date(datas?.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
