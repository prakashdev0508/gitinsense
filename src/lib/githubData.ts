import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { aisummeriseCommit } from "./chatgpt";
import { auth } from "@clerk/nextjs/server";
import { pricingData } from "@/utils/constant";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

type Response = {
  sha: string;
  commitMessage: string;
  commitDate: Date;
  commitAutherName: string;
  commitAutherAvatar: string;
  filesChanged: {
    filename: string;
    status: string; // added, modified, removed
    additions: number;
    deletions: number;
    changes: number;
  }[];
};

export const pollCommits = async (projectId: string) => {
  const {userId} = await auth()
  try {
    const { project, githubUrl } = await fetchgithubUrl(projectId);
    if (!project || !githubUrl) {
      throw new Error("Project or GitHub URL not found");
    }

    const commits = await getCommits(githubUrl);
    const unprocessedCommits = await getUnprocessedCommits(projectId, commits);

    const summarizedCode = await Promise.allSettled(
      unprocessedCommits.map((commit) =>
        summerizeCommits(githubUrl, commit.sha),
      ),
    );

    const commitLogs = summarizedCode
      .map((response, index) => {
        if (response.status === "fulfilled") {
          const commit = unprocessedCommits[index];
          return {
            projectId,
            sha: commit?.sha || "",
            summary: response.value || "",
            commitAuthor: commit?.commitAutherName || "Unknown",
            commitAuthorImage: commit?.commitAutherAvatar || "",
            commitDate: commit?.commitDate as Date,
            commitMesage: commit?.commitMessage || "No commit message found",
            fileChanged: commit?.filesChanged, // Include the filesChanged array
            linesAdded: commit?.filesChanged.reduce(
              (sum, file) => sum + file.additions,
              0,
            ),
            linesDeleted: commit?.filesChanged.reduce(
              (sum, file) => sum + file.deletions,
              0,
            ),
          };
        }
        console.error(
          `Failed to summarize commit: ${unprocessedCommits[index]?.sha}`,
          response.reason,
        );
        return null;
      })
      .filter((log): log is NonNullable<typeof log> => log !== null);

    await db.commitLogs.createMany({ data: commitLogs });
    await db.user.update({
      where: {
        externalId: userId as string,
      },
      data: {
        credits: {
          decrement: pricingData.commitRefresh,
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Error polling commits:", error);
    return false;
  }
};
export const summerizeCommits = async (githubUrl: string, sha: string) => {
  const { data } = await axios.get(`${githubUrl}/commit/${sha}.diff`, {
    headers: {
      Accept: "application/vnd.github.v3.diff",
    },
  });

  const summerisecommitData = await aisummeriseCommit(data);
  return summerisecommitData;
};

export const fetchgithubUrl = async (projectId: string) => {
  const project = await db.projects.findFirst({
    where: {
      id: projectId,
    },
  });

  return {
    project,
    githubUrl: project?.githubUrl as string,
  };
};


export const validateGithubUrl = async (githubUrl: string): Promise<boolean> => {
  try {
    // Extract the owner and repo name from the URL
    const [owner, repo] = githubUrl.split("/").slice(-2);

    if (!owner || !repo) {
      throw new Error("Invalid GitHub repository URL structure");
    }

    // Check if the repository exists
    const response = await octokit.rest.repos.get({
      owner,
      repo,
    });

    // If the API call succeeds, the repository exists
    return response.status === 200;
  } catch (error: any) {
    console.error("Error validating GitHub URL:", error.message);

    // If the repository is not found or an API error occurs, return false
    if (error.status === 404) {
      return false;
    }

    // Handle other errors (e.g., rate limits, auth issues)
    throw new Error("Failed to validate GitHub URL. Please try again later.");
  }
};


export const getCommits = async (githubUrl: string) => {
  const [owner, repo] = githubUrl.split("/").slice(-2);

  if (!owner || !repo) {
    throw new Error("Invalid GitHub repository URL");
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  const sortedData = data.sort((a: any, b: any) => {
    return (
      new Date(b.commit?.author.date).getTime() -
      new Date(a.commit?.author.date).getTime()
    );
  });

  // Fetch details of each commit to get changed files
  const detailedCommits = await Promise.all(
    sortedData.map(async (commit: any) => {
      const { data: commitDetails } = await octokit.rest.repos.getCommit({
        owner,
        repo,
        ref: commit?.sha,
      });

      const filesChanged = commitDetails.files?.map((file: any) => ({
        filename: file.filename,
        status: file.status, // added, modified, removed
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
      }));

      return {
        sha: commit?.sha,
        commitMessage: commit?.commit?.message ?? "",
        commitDate: commit?.commit?.author.date ?? "",
        commitAutherName: commit?.author?.login ?? "Unknown",
        commitAutherAvatar: commit?.author?.avatar_url ?? "",
        filesChanged: filesChanged || [],
      };
    }),
  );

  return detailedCommits;
};
export const getUnprocessedCommits = async (
  projectId: string,
  commits: Response[],
) => {
  const processedCommits = await db.commitLogs.findMany({
    where: {
      projectId: projectId,
    },
  });

  const unprocessedCommits = commits.filter((commit) => {
    return !processedCommits.find((c) => c.sha === commit.sha);
  });

  return unprocessedCommits.slice(0, 5);
};
