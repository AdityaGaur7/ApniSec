import { NextRequest } from 'next/server';
import { IssueHandler } from '@/lib/handlers/IssueHandler';
import { rateLimitMiddleware } from '@/lib/middleware/rateLimit';

const issueHandler = new IssueHandler();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    const { id } = await params;
    return issueHandler.getIssue(req, { params: { id } });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    const { id } = await params;
    return issueHandler.updateIssue(req, { params: { id } });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const rateLimitResponse = await rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    const { id } = await params;
    return issueHandler.deleteIssue(req, { params: { id } });
}
