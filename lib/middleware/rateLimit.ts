import { NextRequest, NextResponse } from 'next/server';
import { globalRateLimiter } from '@/lib/utils/RateLimiter';
import { AppError } from '@/lib/utils/AppError';

export async function rateLimitMiddleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, remaining, reset } = globalRateLimiter.check(ip);

    if (!allowed) {
        return new NextResponse(
            JSON.stringify({ error: 'Too many requests, please try again later.' }),
            {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'X-RateLimit-Limit': '100',
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString(),
                },
            }
        );
    }

    return null; // Allowed
}
