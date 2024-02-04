import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const putRouter = createTRPCRouter({
  updatePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        title: z.string().optional(),
        post: z.string().optional(),
        published: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post.update({
        where: { id: input.postId },
        data: {
          title: input.title,
          post: input.post,
        },
      });
      const perm = await db.post_permission.update({
        where: { postId: input.postId },
        data: {
          published: input.published,
        },
      });
      return post && perm;
    }),
}); // This is the end, lawlz.
