import { prisma } from "@/config/prisma/db";

export const userRepository = {
  findByUsername: (username: string) =>
    prisma.user.findUnique({ where: { username } }),

  create: (username: string) => prisma.user.create({ data: { username } }),
};
