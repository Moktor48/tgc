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
  .input(z.object({ createdById: z.string(), post: z.string(), title: z.string() }))
  .mutation(async ({ input }) => {
    const post = await db.post.create({
      data: {
        createdById: input.createdById,
        post: input.post,
        title: input.title,
      }
    });
    return post;
  }),

//This one works but makes TS mad... 
  postPermissions: protectedProcedure
  .input(z.object({ postId: z.string(), eso: z.boolean(), ffxiv: z.boolean(), swtor: z.boolean(), general: z.boolean(), staff: z.boolean(), raid: z.boolean(), officer: z.boolean() }))
  .mutation(async ({ input }) => {
    const post = await db.post_permission.create({
      data: {
        postId: input.postId,
        eso: input.eso,
        ffxiv: input.ffxiv,
        swtor: input.swtor,
        general: input.general,
        staff: input.staff,
        raid: input.raid,
        officer: input.officer,
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
        title: true,
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

  staffPermission: protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const user = await db.staff.findUnique({
      where: { userId: input.userId },
    });
    return user;
  }),

  esoPermission: protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const user = await db.eso.findUnique({
      where: { userId: input.userId },
    });
    return user;
  }),

  swtorPermission: protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const user = await db.swtor.findUnique({
      where: { userId: input.userId },
    });
    return user;
  }),

  ffxivPermission: protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const user = await db.ffxiv.findUnique({
      where: { userId: input.userId },
    });
    return user;
  }),

}) // This is the end, lawlz. 

