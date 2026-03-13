// app/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Single PrismaClient in dev
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}