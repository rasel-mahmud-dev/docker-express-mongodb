const { PrismaClient } = require("@prisma/client")

const prismaClient = new PrismaClient()
// use `prisma` in your application to read and write data in your DB



module.exports = prismaClient