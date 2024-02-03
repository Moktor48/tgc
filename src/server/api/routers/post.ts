import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
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
        },
      });
      return user;
    }),

  //creates a new post for approval
  post: protectedProcedure
    .input(
      z.object({
        createdById: z.string(),
        post: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post.create({
        data: {
          createdById: input.createdById,
          post: input.post,
          title: input.title,
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
        general: z.boolean(),
        staff: z.boolean(),
        raid: z.boolean(),
        officer: z.boolean(),
      }),
    )
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
        },
      });
      return post;
    }),

  //queries all posts, other queries will include "byGuild" or "byUserId" to filter by guild or user
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
            general: true,
          },
        },
      },
    });
    return posts;
  }),

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

  //Post queries
  unpublishedPosts: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: { published: false },
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
            general: true,
          },
        },
      },
    });
    return posts;
  }),

  unpublishedPostsEso: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: { published: false },
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
            ffxiv: false,
            swtor: false,
            general: false,
          },
        },
      },
    });
    return posts;
  }),

  unpublishedPostsFfxiv: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: { published: false },
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
            eso: false,
            ffxiv: true,
            swtor: false,
            general: false,
          },
        },
      },
    });
    return posts;
  }),

  unpublishedPostsSwtor: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: { published: false },
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
            eso: false,
            ffxiv: false,
            swtor: true,
            general: false,
          },
        },
      },
    });
    return posts;
  }),

  displayPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.postId },
        select: {
          id: true,
          title: true,
          post: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          published: true,
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
          published: input.published,
        },
      });
      return post;
    }),

  modTrack: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        title: z.string(),
        post: z.string(),
        published: z.string(),
        modById: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await db.post_modification.create({
        data: {
          postId: input.postId,
          title: input.title,
          post: input.post,
          published: input.published,
          modById: input.modById,
        },
      });
      return post;
    }),
}); // This is the end, lawlz.
