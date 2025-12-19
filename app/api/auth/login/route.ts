import { NextRequest } from 'next/server';
import { AuthHandler } from '@/lib/handlers/AuthHandler';
import { rateLimitMiddleware } from '@/lib/middleware/rateLimit';

const authHandler = new AuthHandler();

export async function POST(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    return authHandler.login(req);
}
