import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ name: z.string(), contactInfo: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const newlyCreatedUser = await ctx.prisma.speedDateUser.create({
        data: input,
      });
      return newlyCreatedUser;
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
