"use client";
import useProjects from "@/hooks/use-projects";
import { api } from "@/trpc/react";
import { Folder, RefreshCcwIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const ProjectDetails = ({ projectData }: any) => {
  const refreshProject = api.project.refreshProject.useMutation();

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="rounded-lg bg-blue-50 p-2">
            <Folder className="h-8 w-8 text-blue-500" />
          </div>
          <div className="ml-4">
            <div className="text-xl font-bold">{projectData?.name}</div>
            <Link
              href={projectData?.githubUrl || ""}
              target="_blank"
              className="text-sm hover:underline"
            >
              {projectData?.githubUrl}
            </Link>
          </div>
        </div>
        <div>
          <Button
            className={`${
              refreshProject.isPending ? "cursor-not-allowed" : ""
            }ml-3`}
            title="Refresh commits"
            variant={"secondary"}
            onClick={() => {
              if (!refreshProject.isPending) {
                refreshProject.mutate(
                  {
                    projectId: projectData?.id,
                    githubUrl: projectData?.githubUrl as string,
                  },
                  {
                    onSuccess: () => {
                      toast.success("Data refresed ");
                    },
                    onError: () => {
                      toast.error("Failed to refresh data");
                    },
                  },
                );
              }
            }}
            disabled={refreshProject.isPending}
          >
            <RefreshCcwIcon
              className={`${refreshProject.isPending ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
