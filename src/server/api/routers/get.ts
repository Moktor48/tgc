import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.postId },
        select: {
          id: true,
          title: true,
          post: true,
          published: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          permissions: {
            select: {
              eso: true,
              ffxiv: true,
              swtor: true,
              general: true,
            },
          },
        },
      });
      return post;
    }),
}); // This is the end, lawlz.
