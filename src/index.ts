import { PrismaClient } from '@prisma/client';
import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

const prisma = new PrismaClient();

export async function handler(
  _event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> {
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

    // optional: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/#do-not-explicitly-disconnect
    // prisma.$disconnect();

    return {
      body: JSON.stringify({
        message: 'Error on execute function'
      }),
      statusCode: 500
    };
  }
}
