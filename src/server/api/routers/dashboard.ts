import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const dashboardRouter = createTRPCRouter({
    getDashboardDetails: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.user.userId!;

        // Count total repositories
        const repoCount = await ctx.db.projects.count({
            where: { userId },
        });

        // Count total analyzed commits
        const commitCounts = await ctx.db.commitLogs.count({
            where: {
                project: {
                    userId,
                },
            },
        });

        // Count AI summaries (source code embeddings)
        const creditCount = await ctx.db.user.findUnique({
            where: {
                externalId : userId,
            },
            select : {
                credits : true
            }
        });

        // Count AI questions (saved answers)
        const aiQuestionsCount = await ctx.db.savedAnswers.count({
            where: {
                userId,
            },
        });

        // Fetch recent activity (last 3 events)
        const recentActivity = await ctx.db.commitLogs.findMany({
            where: {
                project: {
                    userId,
                },
            },
            orderBy: { createdAt: "desc" },
            take: 3,
            select: {
                id: true,
                commitMesage: true,
                sha: true,
                createdAt: true,
                project: { select: { name: true } },
                commitAuthorImage : true
            },
        });

        return {
            repoCount,
            commitCounts,
            creditCount,
            aiQuestionsCount,
            recentActivity,
        };
    }),
});
