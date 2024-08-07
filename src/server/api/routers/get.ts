import { z } from "zod";
import { db } from "~/server/db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const getRouter = createTRPCRouter({
  pullAccess: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const account = await db.account.findUnique({
        where: { userId: input.userId },
        select: {
          access_token: true,
        },
      });
      return account;
    }),

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
          staff: true,
        },
      });
      return user;
    }),

  userProfile: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { id: input.userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      });
      return user;
    }),

  // Pulling users
  allUsers: protectedProcedure.query(async () => {
    const users = await db.user.findMany({});
    return users;
  }),

  allGuests: protectedProcedure.query(async () => {
    const guests = await db.user.findMany({
      where: { role: "guest" },
    });
    return guests;
  }),
  discordUsers: protectedProcedure.query(async () => {
    const users = await db.discord_user.findMany({});
    return users;
  }),
  //Post Pulls
  getPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.postId },
        select: {
          id: true,
          title: true,
          content: true,
          summary: true,
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
              tgc_guild: true,
              published: true,
              guild_public: true,
              beginner: true,
              officer: true,
              raid: true,
              staff: true,
              intermediate: true,
              advanced: true,
              tgc_member: true,
              type: true,
            },
          },
        },
      });
      return post;
    }),
  get_eso_trials: protectedProcedure.query(async () => {
    const trials = await db.eso_trial_names.findMany({});
    return trials;
  }),
  getAllPosts: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
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
            tgc_guild: true,
          },
        },
      },
    });
    return posts;
  }),

  //Unpublished Post queries
  unpublishedPosts: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: false,
          eso: false,
          ffxiv: false,
          swtor: false,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            tgc_guild: true,
          },
        },
      },
    });
    return posts;
  }),

  unpublishedPostsEso: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: false,
          eso: true,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            eso: true,
          },
        },
      },
    });
    return posts;
  }),

  unpublishedPostsFfxiv: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: false,
          ffxiv: true,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            ffxiv: true,
          },
        },
      },
    });
    return posts;
  }),

  unpublishedPostsSwtor: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: false,
          swtor: true,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            swtor: true,
          },
        },
      },
    });
    return posts;
  }),

  //Published Post queries
  publishedPosts: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: true,
          tgc_guild: true,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            tgc_guild: true,
          },
        },
      },
    });
    return posts;
  }),

  publishedPostsEso: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: true,
          eso: true,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return posts;
  }),

  publishedPostsFfxiv: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: true,
          ffxiv: true,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            ffxiv: true,
          },
        },
      },
    });
    return posts;
  }),

  publishedPostsSwtor: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          published: true,
          swtor: true,
        },
      },
      select: {
        id: true,
        title: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        permissions: {
          select: {
            swtor: true,
          },
        },
      },
    });
    return posts;
  }),
  //all posts
  publishedPostsMod: protectedProcedure
    .input(
      z.object({
        eso: z.boolean(),
        ffxiv: z.boolean(),
        swtor: z.boolean(),
        tgc_guild: z.boolean().optional(),
        type: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const posts = await db.post.findMany({
        where: {
          permissions: {
            published: true,
            eso: input.eso,
            ffxiv: input.ffxiv,
            swtor: input.swtor,
            type: input.type,
          },
        },
        select: {
          id: true,
          title: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          permissions: {
            select: {
              tgc_guild: input.tgc_guild,
              eso: input.eso,
              ffxiv: input.ffxiv,
              swtor: input.swtor,
            },
          },
        },
      });
      return posts;
    }),
  //public posts
  publishedPostsModPub: publicProcedure
    .input(
      z.object({
        tgc_guild: z.boolean(),
        eso: z.boolean(),
        ffxiv: z.boolean(),
        swtor: z.boolean(),
        type: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const posts = await db.post.findMany({
        where: {
          permissions: {
            published: true,
            guild_public: true,
            tgc_guild: input.tgc_guild,
            eso: input.eso,
            ffxiv: input.ffxiv,
            swtor: input.swtor,
            type: input.type,
          },
        },
        select: {
          id: true,
          title: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          permissions: {
            select: {
              tgc_guild: input.tgc_guild,
              eso: input.eso,
              ffxiv: input.ffxiv,
              swtor: input.swtor,
            },
          },
        },
      });
      return posts;
    }),

  motherOfAllPosts: protectedProcedure
    .input(
      z.object({
        tgc_guild: z.boolean(),
        eso: z.boolean(),
        ffxiv: z.boolean(),
        swtor: z.boolean(),
        type: z.string(),
        public: z.boolean(),
        staff: z.boolean(),
        raid: z.boolean(),
        officer: z.boolean(),
      }),
    )
    .query(async ({ input }) => {
      const posts = await db.post.findMany({
        where: {
          permissions: {
            published: true,
            guild_public: input.public,
            tgc_guild: input.tgc_guild,
            eso: input.eso,
            ffxiv: input.ffxiv,
            swtor: input.swtor,
            type: input.type,
            staff: input.staff,
            raid: input.raid,
            officer: input.officer,
          },
        },
        select: {
          id: true,
          title: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return posts;
    }),
  fullPostCount: protectedProcedure.query(async () => {
    const count = await db.post.findMany({
      where: {
        permissions: {
          published: true,
        },
      },

      select: {
        permissions: {
          select: {
            published: true,
            eso: true,
            ffxiv: true,
            swtor: true,
            tgc_guild: true,
            type: true,
          },
        },
      },
    });
    return count;
  }),
  unpubPostCount: protectedProcedure.query(async () => {
    const count = await db.post.findMany({
      where: {
        permissions: {
          published: false,
        },
      },

      select: {
        permissions: {
          select: {
            published: true,
            eso: true,
            ffxiv: true,
            swtor: true,
            tgc_guild: true,
            type: true,
          },
        },
      },
    });
    return count;
  }),
  //Query Permissions
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

  // Queries for LEADERBOARD
  // Example is 10/29/23 to 1/29/24
  pointQuery: protectedProcedure
    .input(z.object({ startDate: z.string(), endDate: z.string() }))
    .query(async ({ input }) => {
      const points = await db.staff_duty.findMany({
        where: {
          timestamp: {
            lte: new Date(input.endDate).toISOString(),
            gte: new Date(input.startDate).toISOString(),
          },
        },
        select: {
          gmember_id: true,
          duty_type: true,
          timestamp: true,
          target: true,
          staff_point_chart: {
            select: {
              point_value: true,
            },
          },
        },
      });
      return points;
    }),

  nameQuery: protectedProcedure
    .input(z.object({ keys: z.array(z.string()) }))
    .query(async ({ input }) => {
      const names = await db.discord_user.findMany({
        where: {
          gmember_id: {
            in: input.keys,
          },
        },
        select: {
          gmember_id: true,
          disc_nickname: true,
        },
      });
      return names;
    }),

  discordUserQuery: protectedProcedure.query(async () => {
    const users = await db.discord_user.findMany({
      select: {
        gmember_id: true,
        disc_nickname: true,
        ingame_name: true,
      },
    });
    return users;
  }),

  dutyQuery: protectedProcedure
    .input(z.object({ start: z.date(), end: z.date() }))
    .query(async ({ input }) => {
      const lte = new Date(input.end).toISOString();
      const gte = new Date(input.start).toISOString();
      console.log("lte:", lte, "and gte:", gte);
      const points = await db.staff_duty.findMany({
        where: {
          timestamp: {
            lte: new Date(input.end).toISOString(),
            gte: new Date(input.start).toISOString(),
          },
        },
        orderBy: {
          timestamp: "asc",
        },
        select: {
          gmember_id: true,
          timestamp: true,
          duty_type: true,
          eso_target_user: true,
          staff_point_chart: {
            select: {
              point_value: true,
              task_description: true,
            },
          },
          discord_user: {
            select: {
              disc_nickname: true,
              highest_rank_role: true,
            },
          },
        },
      });
      return points;
    }),

  dataQuery: protectedProcedure
    .input(z.object({ start: z.date() }))
    .query(async ({ input }) => {
      console.log("Query Start:", input.start);
      const points = await db.staff_duty.findMany({
        where: {
          timestamp: {
            gte: new Date(input.start).toISOString(),
          },
          OR: [
            { duty_type: 99 },
            {
              duty_type: {
                gte: 951,
                lte: 967,
              },
            },
          ],
        },
        orderBy: {
          timestamp: "asc",
        },
        select: {
          gmember_id: true,
          timestamp: true,
          duty_type: true,
          eso_target_user: true,
          staff_point_chart: {
            select: {
              point_value: true,
              task_description: true,
            },
          },
          discord_user: {
            select: {
              disc_nickname: true,
            },
          },
        },
      });
      return points;
    }),

  trialLeader: protectedProcedure.query(async () => {
    const leaders = await db.user.findMany({
      where: {
        eso: {
          raidlead: true,
        },
      },
    });
    return leaders;
  }),
  raiders: protectedProcedure.query(async () => {
    const raiders = await db.user.findMany({
      where: {
        eso: {
          raid: true,
        },
      },
    });
    return raiders;
  }),

  getBugs: protectedProcedure.query(async () => {
    const bugs = await db.bug.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return bugs;
  }),

  getBug: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const bug = await db.bug.findUnique({
        where: { id: input.postId },
        select: {
          id: true,
          title: true,
          content: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return bug;
    }),
  trials: protectedProcedure.query(async () => {
    const raid = await db.eso_raid.findMany({
      select: {
        raid_uid: true,
        trial_name: true,
        start_time: true,
        end_time: true,
        gmember_id: true,
        points: true,
        vitality: true,
        diff_option: true,
        attend: {
          select: {
            raid_uid: true,
            gmember_id: true,
          },
        },
      },
    });
    return raid;
  }),
});

// This is the end, lawlz.
/**
 * 
 allUsers: protectedProcedure.query(async () => {
    const users = await db.user.findMany({});
    return users;
  }),
 * 
 */
