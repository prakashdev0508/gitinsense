"use client";
import React, { useState } from "react";
import { Folder, Zap, FileText, HelpCircle } from "lucide-react";
import { api } from "@/trpc/react";
import CreateProject from "@/components/shared/CreateProject";

const DashboardPage = () => {
  const { data: dashboardData, isLoading } =
    api.dashboard.getDashboardDetails.useQuery();

  const [openCreateProject, setOpenCreateProject] = useState(false);

  return (
    <>
      <div className="p-4 md:p-6">
        {/* Header Stats */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Repositories
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {isLoading ? <>Loading..</> : <>4</>}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <Folder className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <p className="mt-2 text-sm text-green-500">↑ 12% from last month</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Analyzed Commits
                </h3>
                <p className="text-2xl font-bold text-gray-800">1,284</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <Zap className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <p className="mt-2 text-sm text-green-500">↑ 8% from last month</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  AI Summaries
                </h3>
                <p className="text-2xl font-bold text-gray-800">856</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <FileText className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <p className="mt-2 text-sm text-green-500">↑ 15% from last month</p>
          </div>

          {/* Card 4 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  AI Questions
                </h3>
                <p className="text-2xl font-bold text-gray-800">142</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2">
                <HelpCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <p className="mt-2 text-sm text-green-500">↑ 5% from last month</p>
          </div>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="col-span-2 rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              Recent Activity
            </h3>
            <ul>
              <li className="mb-4 flex items-center space-x-4">
                <img
                  src="/avatar.png"
                  alt="User avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">Analyzed repository</span>{" "}
                    frontend-project
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </li>
              <li className="mb-4 flex items-center space-x-4">
                <img
                  src="/avatar.png"
                  alt="User avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">
                      Generated summary for commit
                    </span>{" "}
                    <span className="rounded bg-gray-100 px-2 py-1 font-mono">
                      a4b2c6d
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="/avatar.png"
                  alt="User avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">Asked question about</span> API
                    implementation
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button
                className="flex w-full items-center justify-between rounded-lg bg-blue-50 px-4 py-2 text-blue-700"
                onClick={() => {
                  setOpenCreateProject(!openCreateProject);
                }}
              >
                <span>Add Repository</span>
                <Folder className="h-5 w-5" />
              </button>
              <button className="flex w-full items-center justify-between rounded-lg bg-purple-50 px-4 py-2 text-purple-700">
                <span>Generate Summary</span>
                <FileText className="h-5 w-5" />
              </button>
              <button className="flex w-full items-center justify-between rounded-lg bg-green-50 px-4 py-2 text-green-700">
                <span>Ask Question</span>
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {openCreateProject && (
        <CreateProject
          open={openCreateProject}
          setOpen={setOpenCreateProject}
        />
      )}
    </>
  );
};

export default DashboardPage;
