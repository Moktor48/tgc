import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const deleteRouter = createTRPCRouter({}); // This is the end, lawlz.
