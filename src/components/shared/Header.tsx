"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs"; // Clerk's authentication hook
import { UserButton } from "@clerk/nextjs"; // Clerk's user profile button
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <Link href="/">Logo</Link>
        </div>

        {/* Authentication Buttons */}
        <div>
          {isSignedIn ? (
            <div className="flex">
            <Link href={"/dashboard"} className=" mr-3" >
              <Button size={"sm"}>
                {" "}
                Dashboard <ArrowRight />{" "}
              </Button>
            </Link>
            <div>

              <UserButton afterSignOutUrl="/"  />
            </div>
            </div>
          ) : (
            <Link href={"/sign-in"}>
              <Button>
                Login <ArrowRight />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
