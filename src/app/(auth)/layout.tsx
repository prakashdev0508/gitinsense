import Header from "@/components/shared/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="grid h-96 place-items-center">{children}</div>
    </div>
  );
};

export default layout;
