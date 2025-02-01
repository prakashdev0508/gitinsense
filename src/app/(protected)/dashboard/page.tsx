import React from "react";
import DashboardPage from "./DashboardPage";
import useProjects from "@/hooks/use-projects";
import { loadGithubRepo } from "@/lib/github-loader";
import {chatAi} from "../../../lib/chatGptconfig"

const page = async() => {
  // const res = await chatAi()
  return (
    <div>
      <DashboardPage />
    </div>
  );
};

export default page;
