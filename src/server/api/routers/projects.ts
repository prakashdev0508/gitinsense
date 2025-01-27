import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommits, validateGithubUrl } from "@/lib/githubData";
import { indexGithubRepo } from "@/lib/github-loader";
import { pricingData } from "@/utils/constant";

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
      const checkGithub = await validateGithubUrl(input.githubUrl);

      if (!checkGithub) {
        throw new Error("Error validating github url");
      }

      if (checkGithub) {
        const project = await ctx.db.projects.create({
          data: {
            name: input.name,
            githubUrl: input.githubUrl,
            githubToken: input.githubToken,
            userId: ctx.user.userId!,
          },
        });

        await pollCommits(project.id);
        await indexGithubRepo(project.id, project.githubUrl);
        await ctx.db.user.update({
          where: {
            externalId: ctx.user.userId!,
          },
          data: {
            credits: {
              decrement: pricingData.projectSetup,
            },
          },
        });
        return true;
      }
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
  getMyCredits: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { externalId: ctx.user.userId! },
      select: { credits: true, email: true },
    });
  }),

  reduceCredits: protectedProcedure
    .input(
      z.object({
        credit: z.number().nonnegative(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: {
          externalId: ctx.user.userId!,
        },
        data: {
          credits: {
            decrement: input.credit,
          },
        },
      });
    }),
});
