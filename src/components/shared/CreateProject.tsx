import React, { useState } from "react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { X } from "lucide-react";
import { toast } from "sonner";
import useRefetch from "@/hooks/use-refetch";
import { pricingData } from "@/utils/constant";

const CreateProject = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [githubToken, setGithubToken] = useState("");

  const refetch = useRefetch();

  const clearData = () => {
    setName("");
    setGithubUrl("");
    setGithubToken("");
  };

  const createProject = api.project.createProject.useMutation();
  const { data: user } = api.project.getMyCredits.useQuery();

  const handleCreate = () => {
    if (name.trim() == "" || githubUrl.trim() == "") {
      return toast.error("Please fill all details");
    }

    if (
      Number(user?.credits) <
      Number(
        pricingData.projectSetup +
          pricingData.eachprojectRefresh +
          pricingData.commitRefresh,
      )
    ) {
      return toast.error(
        `Project creation required ${pricingData.projectSetup + pricingData.eachprojectRefresh + pricingData.commitRefresh} token please recharge`,
      );
    }

    createProject.mutate(
      {
        name: name,
        githubUrl: githubUrl,
        githubToken: githubToken,
      },
      {
        onSuccess: async () => {
          toast.success("Project created successfully");
          refetch();
          clearData();
          setOpen(false);
        },
        onError: (error) => {
          toast.error(
            error.data?.zodError?.fieldErrors
              ? JSON.stringify(error.data?.zodError?.fieldErrors)
              : "Failed to create project ",
          );
        },
      },
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        setOpen(false);
        clearData();
      }}
    >
      <div
        className="w-96 rounded-md bg-white p-6 shadow-lg md:w-[40vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h2 className="mb-4 text-lg font-semibold">Create New Project</h2>
          <div className="cursor-pointer">
            <X
              onClick={() => {
                setOpen(false);
                clearData();
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name"
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium">GitHub URL (public repos)</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/user/repo"
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>
        {/* <div className="mb-4">
          <label className="mb-1 block text-xs font-medium">
            GitHub Token (Optional){" "}
          </label>
          <input
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            placeholder="Giithub token"
            className="w-full rounded-md border p-2 text-sm"
          />
        </div> */}
        <div className="w-full">
          <Button
            onClick={handleCreate}
            className={`w-full ${createProject.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={createProject.isPending}
          >
            {createProject.isPending
              ? "Creating Project.... "
              : "Create Project"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
