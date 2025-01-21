import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const savedQuestionRouter = createTRPCRouter({
  createSaveQuestion: protectedProcedure
    .input(
      z.object({
        question: z.string().nonempty(),
        answer: z.string().nonempty(),
        projectId: z.string().nonempty(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const saveAnswer = await ctx.db.savedAnswers.create({
        data: {
          projectId: input.projectId,
          question: input.question,
          answer: input.answer,
          userId: ctx.user.userId!,
        },
      });
      return saveAnswer;
    }),
  getQuestionAnswer: protectedProcedure.query(async ({ ctx, input }) => {
    const savedQuestionAnswer = await ctx.db.savedAnswers.findMany({
      where: {
        userId: ctx.user.userId!,
        isDeletedAt: null,
      },
    });
    return savedQuestionAnswer;
  }),
});
