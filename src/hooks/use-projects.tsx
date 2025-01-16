import { api } from "@/trpc/react";
import {useLocalStorage} from "usehooks-ts"

const useProjects = () => {
  const { data: projects } =  api.project?.getProjects.useQuery();

  const [selectedProjectId , setSelectedProjectId] = useLocalStorage("githubinsite" , "")

  const selectedProject = projects?.find((project) => project.id == selectedProjectId);

  return {
    projects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId
  };
};

export default useProjects;
