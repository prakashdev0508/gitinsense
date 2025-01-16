import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const getCommits = async (githubUrl: string) => {
  const [owner, repo] = githubUrl.split("/").slice(-2);

  if (!owner || !repo) {
    throw new Error("Invlaid Github repo");
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });


  return data.map((commit: any) => {
    return {
      commitHash: commit.sha as string,
      commitMessage: commit.commit.message ?? "",
      commitDate: commit.commit.author.date ?? "",
      commitAutherName: commit.author.login ?? "",
      commitAutherAvatar: commit.author.avatar_url ?? "",
    };
  });
};
