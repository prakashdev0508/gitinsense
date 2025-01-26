
import React from "react";
import BillingPage from "./BillingPage";
import { createCheckoutSession } from "@/lib/stripe";

const page = () => {
    const buttonClick  = (credits : number)=>{
        createCheckoutSession(credits)
    }
  return (
    <div>
      <BillingPage buttonClick={buttonClick} />
    </div>
  );
};

export default page;
