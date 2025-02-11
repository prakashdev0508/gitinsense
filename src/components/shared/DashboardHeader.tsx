"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { InfoIcon, LogOutIcon, Search, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import CreateProject from "./CreateProject";
import useProjects from "@/hooks/use-projects";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const { projects } = useProjects();
  const [open, setOpen] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const router = useRouter();

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
        <div className="cursor-pointer" onClick={() => setOpenLogout(true)}>
          <LogOutIcon />
        </div>
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>

      {open && <CreateProject open={open} setOpen={setOpen} />}
      <>
        {openLogout && (
          <>
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => {
                setOpenLogout(false);
              }}
            >
              <div
                className="w-96 rounded-md bg-white p-6 shadow-lg md:w-[40vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between">
                  <h2 className="mb-2 text-lg font-semibold">
                    Are You sure want to Logout{" "}
                  </h2>
                  <div className="cursor-pointer">
                    <X
                      onClick={() => {
                        setOpenLogout(false);
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center rounded-lg border border-gray-300 bg-blue-100 p-4 shadow-sm">
                  <InfoIcon className="text-blue-500" />
                  <div className="ml-2 items-center align-middle text-sm font-bold text-gray-600">
                    After logout you will be redirected to the home page
                  </div>
                </div>
                <div className="mt-12 grid w-full grid-cols-2 gap-4">
                  <SignOutButton>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        router.push("/");
                        setOpenLogout(false);
                      }}
                    >
                      Logout
                    </Button>
                  </SignOutButton>
                  <Button onClick={() => setOpenLogout(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default DashboardHeader;
