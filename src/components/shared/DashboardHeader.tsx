"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import CreateProject from "./CreateProject";
import useProjects from "@/hooks/use-projects";

const DashboardHeader = () => {
  const { projects } = useProjects();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (projects?.length == 0) {
      setOpen(true);
    }
  }, [projects]);

  return (
    <>
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
      <div className="mr-5 mt-2 flex">
        {/* <div className="relative mr-5 hidden md:block">
          <Input type="search" placeholder="Search..." className="pl-10" />
          <div className="absolute left-2 top-[10px] flex">
            <Search color="gray" size={15} />
            <Separator orientation="vertical" className="ml-2 mr-2 h-4" />
          </div>
        </div> */}
        <div className="mr-5 cursor-pointer">
          {/* Trigger to open the dialog */}
          <Button size="sm" onClick={() => setOpen(true)}>
            New Repo
          </Button>
        </div>
        <UserButton />
      </div>

      {open && <CreateProject open={open} setOpen={setOpen} />}
    </>
  );
};

export default DashboardHeader;
