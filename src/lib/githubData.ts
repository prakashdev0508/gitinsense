import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { aisummeriseCommit } from "./chatgpt";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

type Response = {
  sha: string;
  commitMessage: string;
  commitDate: Date;
  commitAutherName: string;
  commitAutherAvatar: string;
};

export const pollCommits = async (projectId: string) => {
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

    const summaries = summarizedCode.map((response, index) => {
      if (response.status === "fulfilled") {
        return response.value;
      } else {
        console.error(
          `Failed to summarize commit: ${unprocessedCommits[index]?.sha}`,
          response.reason,
        );
        return null;
      }
    });

    const commitLogs = summaries
      .map((summary, index) => {
        if (summary) {
          const commit = unprocessedCommits[index];
          return {
            projectId,
            sha: commit?.sha || "",
            summary,
            commitAuthor: commit?.commitAutherName || "Unknown",
            commitAuthorImage: commit?.commitAutherAvatar || "",
            commitDate: commit?.commitDate as Date,
          };
        }
        return null;
      })
      .filter((log): log is NonNullable<typeof log> => log !== null);

    await db.commitLogs.createMany({ data: commitLogs });
  } catch (error) {
    console.error("Error polling commits:", error);
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

export const getCommits = async (githubUrl: string) => {
  const [owner, repo] = githubUrl.split("/").slice(-2);

  if (!owner || !repo) {
    throw new Error("Invlaid Github repo");
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  const sortedData = data.sort((a: any, b: any) => {
    return (
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime()
    );
  });

  return sortedData.map((commit: any) => {
    return {
      sha: commit.sha as string,
      commitMessage: commit.commit.message ?? "",
      commitDate: commit.commit.author.date ?? "",
      commitAutherName: commit.author.login ?? "",
      commitAutherAvatar: commit.author.avatar_url ?? "",
    };
  });
};

export const getUnprocessedCommits = async (
  projectId: string,
  commits: Response[],
) => {
  const processedCommits = await db.commitLogs.findMany({
    where: {
      id: projectId,
    },
  });

  const unprocessedCommits = commits
    .filter((commit) => {
      return !processedCommits.some((c) => c.sha === commit.sha);
    })
    .slice(0, 5);

  return unprocessedCommits;
};
