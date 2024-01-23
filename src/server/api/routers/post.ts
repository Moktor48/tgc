import { z } from "zod";
import { db } from "~/server/db";
import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";

interface Permission{
  postId: string,
    eso: boolean,
    ffxiv: boolean,
    swtor: boolean,
    general: boolean
  
}

export const postRouter = createTRPCRouter({

 //pulls relations for a userId, can be used to determine access and profiles
  fullProfile: protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const user = await db.user.findUnique({
      where: { id: input.userId },
      include: {
        eso: true,
        swtor: true,
        ffxiv: true,
      }
    });
    return user;
  }),

//creates a new post for approval
  post: protectedProcedure
  .input(z.object({ createdById: z.string(), post: z.string(), name: z.string() }))
  .mutation(async ({ input }) => {
    const post = await db.post.create({
      data: {
        createdById: input.createdById,
        post: input.post,
        name: input.name,
      }
    });
    return post;
  }),

//This one works but makes TS mad... 
  postPermissions: protectedProcedure
  .input(z.object({ postId: z.string(), permissions: z.object({ eso: z.boolean(), ffxiv: z.boolean(), swtor: z.boolean(), general: z.boolean() }) }))
  .mutation(async ({ input }) => {
    const post = await db.post_permission.create({
      data: {
        postId: input.postId,
        eso: input.permissions.eso,
        ffxiv: input.permissions.ffxiv,
        swtor: input.permissions.swtor,
        general: input.permissions.general,
      }
    }) as Permission;
    return post;
  }),

//queries all posts, other queries will include "byGuild" or "byUserId" to filter by guild or user
  getAllPosts: protectedProcedure
  .query(async () => {
    const posts = await db.post.findMany({
      select: {
        id: true,
        name: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          }
        },
        permissions: {
          select: {
            eso: true,
            ffxiv: true,
            swtor: true,
            general: true,
          }
        },  
      }
    });
      return posts;
  }),

}) // This is the end, lawlz. 

