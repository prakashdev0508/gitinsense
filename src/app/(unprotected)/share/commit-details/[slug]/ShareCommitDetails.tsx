"use client";
import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";
import { verifyToken } from "@/utils/jwtTokens";
import React, { useEffect, useState } from "react";

interface DecodedToken {
  id?: string;
  [key: string]: any;
}

const ShareCommitDetails = ({ slug }: { slug: string | undefined }) => {
  const [decodedId, setDecodedId] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      try {
        const decodedData = verifyToken(slug) as DecodedToken;
        setDecodedId(decodedData?.id || null);
      } catch (error) {
        console.error(
          "Verification failed:",
          error instanceof Error ? error.message : "Unknown error",
        );
        setDecodedId(null);
      }
    }
  }, [slug]);

  const {
    data: commitData,
    isLoading,
    isError,
  } = api.project.fetchSingleCommit.useQuery(
    { commitId: decodedId as string },
    {
      enabled: !!decodedId,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !commitData) {
    return <div>Invalid or expired token</div>;
  }

  return (
    <div>
      <h1>Commit Details</h1>
      <>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={commitData.commitAuthorImage}
              alt={commitData.commitAuthor}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className="text-sm font-medium">{commitData.commitMesage}</h2>
              <p className="text-xs text-gray-500">
                {commitData.sha.slice(0, 5)} by{" "}
                <span className="ml-2">{commitData.commitAuthor}</span> ·{" "}
                {new Date(commitData.commitDate).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <span className="ml-10 text-xs text-green-600">
              +{commitData.linesAdded}
            </span>
            <span className="ml-2 text-xs text-red-600">
              +{commitData.linesDeleted}
            </span>
            <span className="ml-2"></span>
          </div>
        </div>
        <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-500">
          {commitData.summary}
        </pre>
        <div className="mt-2 flex">
          {Array.isArray(commitData.fileChanged) &&
            commitData.fileChanged.map((file: any, index: number) => {
              const filename = file.filename.split("/").pop();
              return (
                <Badge key={index} className={`mx-2 bg-green-600`}>
                  {filename}
                </Badge>
              );
            })}
        </div>
      </>
    </div>
  );
};

export default ShareCommitDetails;
