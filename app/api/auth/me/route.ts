import { NextRequest } from 'next/server';
import { UserHandler } from '@/lib/handlers/UserHandler';
import { rateLimitMiddleware } from '@/lib/middleware/rateLimit';

const userHandler = new UserHandler();

export async function GET(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    return userHandler.getProfile(req);
}
