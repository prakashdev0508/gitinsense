"use client";

import AskQuestion from "@/components/projects/AskQuestion";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { api } from "@/trpc/react";
import { notFound } from "next/navigation";
import React from "react";

const ProjectPage = ({ projectId }: { projectId: string }) => {
  const {
    data: projectData,
    isLoading,
    isError,
  } = api.project.getSingleProject.useQuery({
    projectId: projectId,
  });

  console.log("er", projectData);

  if (isLoading) {
    return (
      <div className="grid-cols-4 items-center gap-4 rounded-md px-5 py-8 shadow-md lg:grid lg:divide-x">
        <div className="col-span-2 lg:pr-5">
          {/* Skeleton loader for ProjectDetails */}
          <div className="h-40 w-full animate-pulse rounded-md bg-gray-300"></div>
        </div>
        <div className="col-span-2 mt-10 lg:mt-0 lg:pl-5">
          {/* Skeleton loader for AskQuestion */}
          <div className="h-40 w-full animate-pulse rounded-md bg-gray-300"></div>
        </div>
      </div>
    );
  }

  if (isError || !projectData) {
    notFound();
  }

  return (
    <div className="grid-cols-4 items-center gap-4 rounded-md px-5 py-8 shadow-md lg:grid lg:divide-x">
      <div className="col-span-2 lg:pr-5">
        <ProjectDetails projectData={projectData} />
      </div>
      <div className="col-span-2 mt-10 lg:mt-0 lg:pl-5">
        <AskQuestion projectData={projectData} />
      </div>
    </div>
  );
};

export default ProjectPage;
