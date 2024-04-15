import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const putRouter = createTRPCRouter({
  updatePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        summary: z.string().optional(),
        published: z.boolean().optional(),
        modById: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post.update({
        where: { id: input.postId },
        data: {
          title: input.title,
          summary: input.summary,
          content: input.content,
        },
      });
      const perm = await db.post_permission.update({
        where: { postId: input.postId },
        data: {
          published: input.published,
        },
      });
      const mod = await db.post_modification.update({
        where: { postId: input.postId },
        data: {
          modById: input.modById,
        },
      });
      return post && perm && mod;
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
        image: z.string().optional(),
        role: z.string().optional(),
        guild: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const putUser = await db.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          image: input.image,
          role: input.role,
          tgc_guild_member: input.guild,
        },
      });
      return putUser;
    }),

  updateUserEso: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        rank: z.string().optional(),
        raid: z.boolean().optional(),
        raidlead: z.boolean().optional(),
        mentor: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const putUserEso = await db.eso.update({
        where: { userId: input.userId },
        data: {
          rank: input.rank,
          raid: input.raid,
          raidlead: input.raidlead,
          mentor: input.mentor,
        },
      });
      return putUserEso;
    }),

  updateUserFfxiv: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        rank: z.string().optional(),
        raid: z.boolean().optional(),
        raidlead: z.boolean().optional(),
        mentor: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const putUserFfxiv = await db.ffxiv.update({
        where: { userId: input.userId },
        data: {
          rank: input.rank,
          raid: input.raid,
          raidlead: input.raidlead,
          mentor: input.mentor,
        },
      });
      return putUserFfxiv;
    }),

  updateUserSwtor: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        rank: z.string().optional(),
        raid: z.boolean().optional(),
        raidlead: z.boolean().optional(),
        mentor: z.boolean().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const putUserSwtor = await db.swtor.update({
        where: { userId: input.userId },
        data: {
          rank: input.rank,
          raid: input.raid,
          raidlead: input.raidlead,
          mentor: input.mentor,
        },
      });
      return putUserSwtor;
    }),

  updateUserStaff: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        admin: z.boolean(),
        specialist: z.boolean(),
        representative: z.boolean(),
        highcouncil: z.boolean(),
        guildmaster: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const staff = await db.staff.update({
        where: { userId: input.userId },
        data: {
          admin: input.admin,
          specialist: input.specialist,
          representative: input.representative,
          highcouncil: input.highcouncil,
          guildmaster: input.guildmaster,
        },
      });
      return staff;
    }),
}); // This is the end, lawlz.
