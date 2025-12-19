import { NextRequest } from 'next/server';
import { IssueHandler } from '@/lib/handlers/IssueHandler';
import { rateLimitMiddleware } from '@/lib/middleware/rateLimit';

const issueHandler = new IssueHandler();

export async function GET(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    return issueHandler.getIssues(req);
}

export async function POST(req: NextRequest) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    return issueHandler.createIssue(req);
}
