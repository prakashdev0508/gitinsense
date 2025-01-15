"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Folder,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Tv,
} from "lucide-react";

import { NavMain } from "./sidebar/nav-main";
import { NavProjects } from "./sidebar/nav-projects";
import { NavUser } from "./sidebar/nav-user";
import { TeamSwitcher } from "./sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useProjects from "@/hooks/use-projects";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Github Ai",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { projects } = useProjects();

  const projectData = projects?.map((project) => {
    return {
      title: project.name,
      url: `/project/${project?.id}`,
      id : project?.id
    };
  });

  const mainNavData = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Q&A",
      url: "/saved-answer",
      icon: Bot,
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: Tv,
    },
    {
      title: "Repositories",
      url: "#",
      icon: Folder,
      items: projectData,
    },
    {
      title: "Billings",
      url: "/billings",
      icon: Settings2,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
