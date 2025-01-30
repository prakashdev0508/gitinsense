"use client";
import React, { useState } from "react";
import { Folder, Zap, FileText, HelpCircle, CoinsIcon } from "lucide-react";
import { api } from "@/trpc/react";
import CreateProject from "@/components/shared/CreateProject";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-lg bg-white p-6 shadow">
    <div className="flex items-center justify-between">
      <div>
        <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
        <div className="h-6 w-16 rounded bg-gray-300"></div>
      </div>
      <div className="h-12 w-12 rounded-lg bg-gray-300"></div>
    </div>
  </div>
);

const SkeletonActivity = () => (
  <li className="mb-4 flex animate-pulse items-center space-x-4">
    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
    <div>
      <div className="mb-2 h-4 w-96 rounded bg-gray-300"></div>
      <div className="h-3 w-24 rounded bg-gray-300"></div>
    </div>
  </li>
);

const DashboardPage = () => {
  const { data: dashboardData, isLoading } =
    api.dashboard.getDashboardDetails.useQuery();
  const [openCreateProject, setOpenCreateProject] = useState(false);

  return (
    <>
      <div className="p-4 md:p-6">
        {/* Header Stats */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : [
                {
                  label: "Remaining Credits",
                  value: dashboardData?.creditCount?.credits,
                  icon: CoinsIcon,
                  color: "text-green-500",
                },
                {
                  label: "Total Repositories",
                  value: dashboardData?.repoCount,
                  icon: Folder,
                  color: "text-blue-500",
                },
                {
                  label: "Analyzed Commits",
                  value: dashboardData?.commitCounts,
                  icon: Zap,
                  color: "text-purple-500",
                },
                {
                  label: "Saved Questions",
                  value: dashboardData?.aiQuestionsCount,
                  icon: HelpCircle,
                  color: "text-yellow-500",
                },
              ].map(({ label, value, icon: Icon, color }, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        {label}
                      </h3>
                      <p className="text-2xl font-bold text-gray-800">
                        {value ?? 0}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2">
                      <Icon className={`h-8 w-8 ${color}`} />
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <div className="col-span-3 rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              Recent Commit Activity
            </h3>
            <ul>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonActivity key={index} />
                ))
              ) : dashboardData?.recentActivity.length ? (
                dashboardData.recentActivity.map((activity) => (
                  <li
                    key={activity.id}
                    className="mb-4 flex items-center space-x-4"
                  >
                    <img
                      src={activity.commitAuthorImage}
                      alt="User avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-bold">Commit:</span>{" "}
                        {activity.commitMesage} in
                        <span className="font-bold">
                          {" "}
                          {activity.project.name}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p>No recent activity found.</p>
              )}
            </ul>
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
