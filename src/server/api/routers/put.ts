import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const putRouter = createTRPCRouter({
  publish: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        published: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post_permission.update({
        where: { postId: input.postId },
        data: { published: input.published },
      });
      return post;
    }),

  updatePost: protectedProcedure
    .input(
      z.object({
        ori_title: z.string(),
        ori_summary: z.string(),
        ori_content: z.string(),
        postId: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        summary: z.string().optional(),
        published: z.boolean().optional(),
        modById: z.string(),
        eso: z.boolean().optional(),
        ffxiv: z.boolean().optional(),
        swtor: z.boolean().optional(),
        staff: z.boolean().optional(),
        general: z.boolean().optional(),
        officer: z.boolean().optional(),
        guild_public: z.boolean().optional(),
        member: z.boolean().optional(),
        raid: z.boolean().optional(),
        beginner: z.boolean().optional(),
        intermediate: z.boolean().optional(),
        advanced: z.boolean().optional(),
        type: z.string().optional(),
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
      const postContent = await db.post_permission.update({
        where: { postId: input.postId },
        data: {
          eso: input.eso,
          ffxiv: input.ffxiv,
          swtor: input.swtor,
          staff: input.staff,
          tgc_guild: input.general,
          officer: input.officer,
          guild_public: input.guild_public,
          tgc_member: input.member,
          raid: input.raid,
          beginner: input.beginner,
          intermediate: input.intermediate,
          advanced: input.advanced,
          type: input.type,
          published: input.published,
        },
      });
      const isMod = await db.post_modification.findFirst({
        where: { postId: input.postId },
      });
      if (!isMod) {
        const mod = await db.post_modification.create({
          data: {
            ori_title: input.ori_title,
            ori_summary: input.ori_summary,
            ori_content: input.ori_content,
            postId: input.postId,
            modById: input.modById,
          },
        });
        return post && postContent && mod;
      }
      const mod = await db.post_modification.update({
        where: { postId: input.postId },
        data: {
          ori_title: input.title,
          ori_summary: input.summary,
          ori_content: input.content,
          postId: input.postId,
          modById: input.modById,
        },
      });
      return post && postContent && mod;
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
        admin: z.boolean().optional(),
        specialist: z.boolean().optional(),
        representative: z.boolean().optional(),
        highcouncil: z.boolean().optional(),
        guildmaster: z.boolean().optional(),
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
