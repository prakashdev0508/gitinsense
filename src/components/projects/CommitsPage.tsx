"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ExternalLink, RefreshCcwIcon, Share } from "lucide-react";
import { api } from "@/trpc/react";
import useProjects from "@/hooks/use-projects";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import useRefetch from "@/hooks/use-refetch";
import { toast } from "sonner";
import { generateToken } from "@/utils/jwtTokens";
import Link from "next/link";

export default function CommitsPage({ projectId }: { projectId: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const commitsPerPage = 5;

  const refetch = useRefetch();

  const {
    data: commitLogs,
    isLoading,
    isError,
  } = api.project.getCommitsData.useQuery({
    projectId: projectId,
  });

  const fetchNewCommits = api.project.fetchNewCommits.useMutation();

  const { selectedProject } = useProjects();

  const sortedCommits = commitLogs?.sort((a: any, b: any) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return dateA.getTime() - dateB.getTime();
  });

  // Filter commit logs based on the search query
  const filteredCommits = sortedCommits?.filter((commit) => {
    const commitMessageMatch = commit.commitMesage
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return commitMessageMatch;
  });

  const totalCommits = filteredCommits?.length || 0;
  const totalPages = Math.ceil(totalCommits / commitsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  // Paginate the filtered commit logs
  const paginatedCommits = filteredCommits?.slice(
    (currentPage - 1) * commitsPerPage,
    currentPage * commitsPerPage,
  );

  const generateShareableLink = (commitId: string) => {
    try {
      const token = generateToken(commitId); // Ensure commitId is correct
      const url = `${window.location.origin}/share/commit-details/${token}`;
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
      return url;
    } catch (error) {
      console.error("Failed to generate token or link", error);
      toast.error("Failed to generate shareable link.");
    }
  };

  return (
    <div className="mx-auto max-w-full">
      {isLoading ? (
        <div className="grid h-screen place-items-center">
          Loading Commit logs
        </div>
      ) : (
        <>
          {commitLogs?.length === 0 ? (
            <></>
          ) : (
            <div className="">
              {/* Filters */}
              <div className="mb-6 flex justify-between space-x-4">
                <div className="mt-3">
                  <b>Commits Logs</b>
                </div>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Search by commit message.."
                    className="w-72"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    className={`${
                      fetchNewCommits.isPending ? "cursor-not-allowed" : ""
                    }ml-3`}
                    title="Refresh commits"
                    variant={"secondary"}
                    onClick={() => {
                      if (!fetchNewCommits.isPending) {
                        fetchNewCommits.mutate(
                          {
                            projectId,
                          },
                          {
                            onSuccess: () => {
                              refetch();
                              toast.success("New commits fetched");
                            },
                            onError: () => {
                              toast.error("Failed to fetch data");
                            },
                          },
                        );
                      }
                    }}
                    disabled={fetchNewCommits.isPending}
                  >
                    <RefreshCcwIcon
                      className={`${
                        fetchNewCommits.isPending ? "animate-spin" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>

              {/* Commit List */}
              {filteredCommits?.length == 0 ? (
                <>Nothing in commit log</>
              ) : (
                <>
                  <div className="space-y-4">
                    {paginatedCommits?.map((commit, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={commit.commitAuthorImage}
                              alt={commit.commitAuthor}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <h2 className="text-sm font-medium">
                                {commit.commitMesage}
                              </h2>
                              <p className="text-xs text-gray-500">
                                {commit.sha.slice(0, 5)} by{" "}
                                <span className="ml-2">
                                  {commit.commitAuthor}
                                </span>{" "}
                                · {new Date(commit.commitDate).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className="ml-10 text-xs text-green-600">
                              +{commit.linesAdded}
                            </span>
                            <span className="ml-2 text-xs text-red-600">
                              -{commit.linesDeleted}
                            </span>
                            <span className="ml-2">
                              {/* <Button
                                variant="ghost"
                                title="Share commit details"
                                onClick={() => {
                                  generateShareableLink(commit.id);
                                }}
                              >
                                {" "}
                                <Share />{" "}
                              </Button> */}
                              <Link
                                href={`${selectedProject?.githubUrl}/commit/${commit.sha}`}
                                target="_blank"
                              >
                                <Button variant={"ghost"}>
                                  <ExternalLink className="ml-1 size-4" />
                                </Button>
                              </Link>
                            </span>
                          </div>
                        </div>
                        <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-500">
                          {commit.summary}
                        </pre>
                        <div className="mt-2">
                          {Array.isArray(commit.fileChanged) &&
                            commit.fileChanged.map(
                              (file: any, index: number) => {
                                const filename = file.filename.split("/").pop();
                                return (
                                  <Badge
                                    key={index}
                                    className={`mx-2 bg-green-600`}
                                  >
                                    {filename}
                                  </Badge>
                                );
                              },
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Showing commits {currentPage * commitsPerPage - 4}-
                      {currentPage * commitsPerPage} of {totalCommits}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-3 py-1 text-sm ${
                          currentPage === 1
                            ? "cursor-not-allowed bg-gray-200 text-gray-500"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } rounded-lg`}
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-3 py-1 text-sm ${
                            currentPage === index + 1
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          } rounded-lg`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-3 py-1 text-sm ${
                          currentPage === totalPages
                            ? "cursor-not-allowed bg-gray-200 text-gray-500"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } rounded-lg`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
