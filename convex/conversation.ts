// import { v } from "convex/values";
// import { query } from "./_generated/server";

// export const GetConversationById=query({
//     args:{
//         agentId:v.id('AgentTable'),
//         userId:v.id('UserTable'),
//     },
//     handler:async(ctx,args)=>{
//         const result = await ctx.db.query.ConversationTable
//         .filter(q => q.and(q.eq(q.field('agentId'),args.agentId),
//                 q.eq(q.field('userId'),args.userId)))
//                 .collect();

//                 return result[0];
//     }
// })

import { v } from "convex/values";
import { query } from "./_generated/server";

export const GetConversationById = query({
  args: {
    agentId: v.id("AgentTable"),
    userId: v.id("UserTable"),
  },
  handler: async (ctx, args) => {
    // BUG FIX: correct Convex query syntax — use string, not dot notation
    const result = await ctx.db
      .query("ConversationTable")
      .filter((q) =>
        q.and(
          q.eq(q.field("agentId"), args.agentId),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .collect();

    return result[0] ?? null; // return null instead of undefined — safer to check
  },
});