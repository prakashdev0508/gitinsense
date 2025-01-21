import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommits } from "@/lib/githubData";
import { indexGithubRepo } from "@/lib/github-loader";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        githubUrl: z.string().nonempty(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.projects.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          githubToken: input.githubToken,
          userId: ctx.user.userId!,
        },
      });

      await pollCommits(project.id);
      return true;
    }),
  getProjects: protectedProcedure.query(async ({ ctx, input }) => {
    const projects = await ctx.db.projects.findMany({
      where: {
        userId: ctx.user.userId!,
      },
    });
    return projects;
  }),

  getCommitsData: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const commites = await ctx.db.commitLogs.findMany({
        where: {
          projectId: input.projectId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return commites;
    }),

  fetchNewCommits: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await pollCommits(input.projectId);
      return true;
    }),
  fetchSingleCommit: publicProcedure
    .input(
      z.object({
        commitId: z.string().nonempty(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const commit = await ctx.db.commitLogs.findUnique({
        where: {
          id: input.commitId,
        },
      });
      return commit;
    }),
  refreshProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string().nonempty(),
        githubUrl: z.string().nonempty(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await indexGithubRepo(input.projectId, input.githubUrl);
    }),
  getSingleProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string().nonempty(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.projects.findUnique({
        where: {
          id: input.projectId,
        },
      });
      return project;
    }),
});
