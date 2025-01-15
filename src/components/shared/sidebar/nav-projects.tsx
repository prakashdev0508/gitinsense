"use client";

import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    id: string;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects?.map((item , index) => (
            <SidebarMenuItem
              key={index}
              className="cursor-pointer"
            >
              <SidebarMenuButton asChild>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={` cursor-pointer py-1 text-sm`}
                  >
                    {" "}
                    {item.name[0]}
                  </Badge>
                  <span>{item.name}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        <Link href="/create">
          <SidebarMenuButton className="mt-4 w-fit rounded-lg border border-sidebar-foreground/10">
            <Plus className="" />
            <span>Create Project</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenu>
    </SidebarGroup>
  );
}