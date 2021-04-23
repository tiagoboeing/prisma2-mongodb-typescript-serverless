import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();

    const posts = await prisma.post.findMany({
      include: {
        comments: true
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (err) {
    console.error(err);
    prisma.$disconnect();
  }
}

export const handler = main;
