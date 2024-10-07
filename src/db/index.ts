import { PrismaClient } from '@prisma/client'

// Extend NodeJS global interface to add the cachedPrisma property
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined; // Can be undefined at first
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(); // Always create a new instance in production
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient(); // Cache the instance on the global object
  }
  prisma = global.cachedPrisma; // Reuse the cached Prisma client
}

export const db = prisma;
 