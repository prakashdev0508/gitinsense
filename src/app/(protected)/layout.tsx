import { AppSidebar } from "@/components/shared/app-sidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {" "}
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="shadow-none">
          <div className="border-b-[1px] border-gray-200 bg-white shadow-none">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <DashboardHeader />
            </header>
          </div>
          <div className="mt-3 flex flex-1 flex-col gap-4 p-2">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default layout;
