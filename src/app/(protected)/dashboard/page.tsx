import React from "react";
import DashboardPage from "./DashboardPage";
import useProjects from "@/hooks/use-projects";
import { loadGithubRepo } from "@/lib/github-loader";

const page = async() => {
  // const response = await loadGithubRepo("https://github.com/docker/genai-stack")
  // console.log("repos res" , response)
  return (
    <div>
      <DashboardPage />
    </div>
  );
};

export default page;
