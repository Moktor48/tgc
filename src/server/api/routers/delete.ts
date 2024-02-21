import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const deleteRouter = createTRPCRouter({
  deleteAccount: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const account = await db.account.delete({
        where: { userId: input.userId },
      });
      return account;
    }),
}); // This is the end, lawlz.
