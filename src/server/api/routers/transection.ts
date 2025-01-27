import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const transectionRouter = createTRPCRouter({
  getAllTransections: protectedProcedure.query(async ({ ctx }) => {
    const transectionData = await ctx.db.stripeTransection.findMany({
      where: {
        userId: ctx.user.userId!,
        status: {
          not: "INITIATED",
        },
      },
    });
    return transectionData;
  }),
});
