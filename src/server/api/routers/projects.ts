import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/githubData";

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
});
