"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

const DashboardHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
      <div className="mr-5 mt-2 flex">
        <div className=" md:block hidden relative mr-5">
          <Input type="search" placeholder="Search..." className="pl-10" />
          <div className="absolute left-2 top-[10px] flex">
            {" "}
            <Search color="gray" size={15} />{" "}
            <Separator orientation="vertical" className="ml-2 mr-2 h-4" />
          </div> 
        </div>
        <div className="mr-5 cursor-pointer">
          <Button size={"sm"}>New Repo</Button>
        </div>
        <UserButton />
      </div>
    </>
  );
};

export default DashboardHeader;
