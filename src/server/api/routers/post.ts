import { z } from "zod";
import { db } from "~/server/db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";


export const postRouter = createTRPCRouter({
 
})


/*

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

  getUser: protectedProcedure.query(({ ctx }) => {
    .query('getRole', {
      input: z.object({
        userId: z.string()
      }),
      async resolve({ input }) {
        const { userId } = input
        const user = await db.user.findUnique({
          where: { id: userId },
          select: { role: true }  
        })
        return user
      }
    })
 getUser: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async (input) => {
    const user = await db.user.findUnique({
      where: {
        id: input.id,
      },
    });
    return user
  })
    */