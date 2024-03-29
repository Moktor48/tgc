import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { getRouter } from "./routers/get";
import { putRouter } from "./routers/put";
import { deleteRouter } from "./routers/delete";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  get: getRouter,
  delete: deleteRouter,
  put: putRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
