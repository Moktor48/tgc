import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const getRouter = createTRPCRouter({
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

  //Post Pulls
  getPost: protectedProcedure
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
            },
          },
          permissions: {
            select: {
              eso: true,
              ffxiv: true,
              swtor: true,
              general: true,
              published: true,
            },
          },
        },
      });
      return post;
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
            general: true,
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
          some: {
            published: false,
            general: true,
          },
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
            general: true,
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
          some: {
            published: false,
            eso: true,
          },
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
          some: {
            published: false,
            ffxiv: true,
          },
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
          some: {
            published: false,
            swtor: true,
          },
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
          some: {
            published: true,
            general: true,
          },
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
            general: true,
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
          some: {
            published: true,
            eso: true,
          },
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

  publishedPostsFfxiv: protectedProcedure.query(async () => {
    const posts = await db.post.findMany({
      where: {
        permissions: {
          some: {
            published: true,
            ffxiv: true,
          },
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
          some: {
            published: true,
            swtor: true,
          },
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

  // Testing:
  // esoLeaderboard: protectedProcedure
  //   .input(z.object({ userId: z.string() }))
  //   .query(async ({ input }) => {
  //     const user = await db.eso.findUnique({
  //       where: { userId: input.userId },
  //     });
  //     return user;
  //   }),



}); // This is the end, lawlz.
