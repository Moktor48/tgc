import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import axios from "axios";
import * as cheerio from "cheerio";
export const postRouter = createTRPCRouter({
  //creates a new post for approval
  post: protectedProcedure
    .input(
      z.object({
        createdById: z.string(),
        content: z.string(),
        summary: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post.create({
        data: {
          createdById: input.createdById,
          content: input.content,
          summary: input.summary,
          title: input.title,
          timestamp: new Date(),
          updatedAt: new Date(),
        },
      });
      return post;
    }),

  //This one works but makes TS mad...
  postPermissions: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        eso: z.boolean(),
        ffxiv: z.boolean(),
        swtor: z.boolean(),
        tgc_guild: z.boolean(),
        staff: z.boolean(),
        raid: z.boolean(),
        officer: z.boolean(),
        type: z.string(),
        guild_public: z.boolean(),
        beginner: z.boolean(),
        intermediate: z.boolean(),
        advanced: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post_permission.create({
        data: {
          postId: input.postId,
          eso: input.eso,
          ffxiv: input.ffxiv,
          swtor: input.swtor,
          tgc_guild: input.tgc_guild,
          staff: input.staff,
          raid: input.raid,
          officer: input.officer,
          type: input.type,
          guild_public: input.guild_public,
          beginner: input.beginner,
          intermediate: input.intermediate,
          advanced: input.advanced,
        },
      });
      return post;
    }),

  //Create
  createUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        role: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await db.user.create({
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
          image: input.image,
        },
      });
      return user;
    }),

  createStaffPermission: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        admin: z.boolean(),
        specialist: z.boolean(),
        representative: z.boolean(),
        juniorofficer: z.boolean(),
        officer: z.boolean(),
        highcouncil: z.boolean(),
        guildmaster: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const staff = await db.staff.create({
        data: {
          userId: input.userId,
          admin: input.admin,
          specialist: input.specialist,
          representative: input.representative,
          juniorofficer: input.juniorofficer,
          officer: input.officer,
          highcouncil: input.highcouncil,
          guildmaster: input.guildmaster,
        },
      });
      return staff;
    }),

  createEsoPermission: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        rank: z.string(),
        raid: z.boolean(),
        raidlead: z.boolean(),
        mentor: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const eso = await db.eso.create({
        data: {
          userId: input.userId,
          rank: input.rank,
          raid: input.raid,
          raidlead: input.raidlead,
          mentor: input.mentor,
        },
      });
      return eso;
    }),

  createSwtorPermission: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        rank: z.string(),
        raid: z.boolean(),
        raidlead: z.boolean(),
        mentor: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const swtor = await db.swtor.create({
        data: {
          userId: input.userId,
          rank: input.rank,
          raid: input.raid,
          raidlead: input.raidlead,
          mentor: input.mentor,
        },
      });
      return swtor;
    }),

  createFfxivPermission: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        rank: z.string(),
        raid: z.boolean(),
        raidlead: z.boolean(),
        mentor: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const ffxiv = await db.ffxiv.create({
        data: {
          userId: input.userId,
          rank: input.rank,
          raid: input.raid,
          raidlead: input.raidlead,
          mentor: input.mentor,
        },
      });
      return ffxiv;
    }),

  modTrack: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        title: z.string(),
        post: z.string(),
        published: z.string(),
        modById: z.string(),
        summary: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post_modification.create({
        data: {
          postId: input.postId,
          ori_title: input.title,
          ori_content: input.post,
          published: input.published,
          modById: input.modById,
          ori_summary: input.summary,
        },
      });
      return post;
    }),

  staffDuty: protectedProcedure
    .input(
      z.array(
        z.object({
          gmember_id: z.string(),
          duty_type: z.number(),
          timestamp: z.date(),
          eso_target_user: z.string(),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      const staff = await db.staff_duty.createMany({
        data: input,
      });
      return staff;
    }),

  bug: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        createdById: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const bug = await db.bug.create({
        data: {
          title: input.title,
          content: input.content,
          createdById: input.createdById,
        },
      });
      return bug;
    }),
  scrape: protectedProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { data } = await axios.get<string>(input.url);
      const $ = cheerio.load(data);
      const pageTitle = $("td").text();
      return { title: pageTitle };
    }),
  trial_default: protectedProcedure
    .input(
      z.object({
        coreDungeons: z.array(z.string()),
        dlcDungeons: z.array(z.string()),
        trials: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      const { coreDungeons, dlcDungeons, trials } = input;
      await db.eso_trial_names.deleteMany();
      // Insert core dungeons
      await db.eso_trial_names.createMany({
        data: coreDungeons.map((name) => ({
          trial_name: name,
          type: "core",
        })),
      });

      // Insert dlc dungeons
      await db.eso_trial_names.createMany({
        data: dlcDungeons.map((name) => ({
          trial_name: name,
          type: "dlc",
        })),
      });

      // Insert trials
      await db.eso_trial_names.createMany({
        data: trials.map((name) => ({
          trial_name: name,
          type: "trial",
        })),
      });
    }),
}); // This is the end, lawlz.
