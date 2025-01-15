import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
      console.log("userId" , ctx.user.userId)
      const project = await ctx.db.projects.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          githubToken: input.githubToken,
          userId: ctx.user.userId!,
        },
      });

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
});
