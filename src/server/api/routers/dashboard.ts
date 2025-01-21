import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const dashboardRouter = createTRPCRouter({
    getDashboardDetails : protectedProcedure.query(async({ctx })=>{
        const repoCount = await ctx.db.projects.count({
            where : {
                userId : ctx.user.userId!
            }
        })
        

        return 5

    })
})