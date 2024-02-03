import { z } from "zod";
import { db } from "~/server/db";
import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({


}) // This is the end, lawlz. 