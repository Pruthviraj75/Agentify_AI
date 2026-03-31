// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//     UserTable:defineTable({
//         name:v.string(),
//         email:v.string(),
//         subscription:v.optional(v.string()),
//         token:v.number(),
//     }),

//     AgentTable: defineTable({
//         agentId: v.string(),
//         name: v.string(),
//         config: v.optional(v.string()),
//         nodes: v.optional(v.any()),
//         edges: v.optional(v.any()),
//         published: v.boolean(),
//         userId: v.id('UserTable'),
//         agentToolConfig: v.optional(v.any())
//     }),

//     ConversationTable: defineTable({
//         conversationId: v.string(),
//         agentId: v.id('AgentTable'),
//         userId: v.id('UserTable'),
//     })
// })


import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
    name: v.string(),
    email: v.string(),
    subscription: v.optional(v.string()),
    token: v.number(),
  }),

  AgentTable: defineTable({
    agentId: v.string(),
    name: v.string(),
    config: v.optional(v.string()),
    nodes: v.optional(v.any()),
    edges: v.optional(v.any()),
    published: v.boolean(),
    userId: v.id("UserTable"),
    agentToolConfig: v.optional(v.any()),
  }),

  ConversationTable: defineTable({
    conversationId: v.string(),
    agentId: v.id("AgentTable"),
    // Changed from v.id('UserTable') → v.string() so "preview-user" works in preview mode
    userId: v.string(),
  }),

  MessagesTable: defineTable({
    conversationId: v.string(),
    agentId: v.id("AgentTable"),
    userId: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
  }).index("by_conversationId", ["conversationId"]),
});