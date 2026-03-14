// app/lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var globalForPrisma: { prisma?: PrismaClient };
}

// Create a single Prisma Client instance and export it
export const prisma =
  globalThis.globalForPrisma?.prisma ||
  new PrismaClient({}); // <- can leave empty, will use DATABASE_URL

  // Ensure the Prisma Client is shared across hot reloads in development
if (!globalThis.globalForPrisma) globalThis.globalForPrisma = {};
globalThis.globalForPrisma.prisma = prisma;