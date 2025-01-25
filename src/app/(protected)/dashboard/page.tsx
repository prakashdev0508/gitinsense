import React from "react";
import DashboardPage from "./DashboardPage";
import useProjects from "@/hooks/use-projects";
import { loadGithubRepo  } from "@/lib/github-loader";

const page = async() => {
  return (
    <div>
      <DashboardPage />
    </div>
  );
};

export default page;
