import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const isProduction = process.env.NODE_ENV === 'production'

// Use Turso in production, local SQLite in development
const url = isProduction
    ? process.env.TURSO_DATABASE_URL
    : process.env.DATABASE_URL || 'file:./dev.db'

const authToken = isProduction ? process.env.TURSO_AUTH_TOKEN : undefined

const adapter = new PrismaLibSql({
    url: url as string,
    authToken: authToken,
})

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
