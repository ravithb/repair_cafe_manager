import 'dotenv/config'
import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host: process.env["DATABASE_HOST"],
  port: parseInt(""+process.env["DATABASE_PORT"]),
  user: process.env["DATABASE_USER"],
  password: process.env["DATABASE_PASSWORD"],
  database: process.env["DATABASE"],
  connectionLimit: 5
})

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    log: ['query']
  } as any);
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma