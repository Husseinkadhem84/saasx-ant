import { PrismaClient } from '@prisma/client';
import { config } from './env.js';

// Prevent multiple instances of Prisma Client in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: config.DATABASE_URL || 'postgresql://dummy:password@localhost:5432/dummy',
      },
    },
    log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (config.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
