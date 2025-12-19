import { NextRequest, NextResponse } from 'next/server';
import { IssueService } from '@/lib/services/IssueService';
import { verifyAuth } from '@/lib/middleware/auth';
import { AppError } from '@/lib/utils/AppError';
import Database from '@/lib/db/db';

export class IssueHandler {
    private issueService: IssueService;

    constructor() {
        this.issueService = new IssueService();
    }

    async createIssue(req: NextRequest) {
        try {
            await Database.getInstance().connect();
            const userId = await verifyAuth(req);
            const body = await req.json();
            const issue = await this.issueService.createIssue(userId, body);
            return NextResponse.json(issue, { status: 201 });
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async getIssues(req: NextRequest) {
        try {
            await Database.getInstance().connect();
            const userId = await verifyAuth(req);
            const { searchParams } = new URL(req.url);
            const type = searchParams.get('type') || undefined;

            const issues = await this.issueService.getUserIssues(userId, type);
            return NextResponse.json(issues);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async getIssue(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            await Database.getInstance().connect();
            const userId = await verifyAuth(req);
            const issue = await this.issueService.getIssueById(params.id, userId);
            return NextResponse.json(issue);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async updateIssue(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            await Database.getInstance().connect();
            const userId = await verifyAuth(req);
            const body = await req.json();
            const issue = await this.issueService.updateIssue(params.id, userId, body);
            return NextResponse.json(issue);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async deleteIssue(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            await Database.getInstance().connect();
            const userId = await verifyAuth(req);
            await this.issueService.deleteIssue(params.id, userId);
            return NextResponse.json({ message: 'Issue deleted' });
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    private handleError(error: any) {
        const statusCode = error instanceof AppError ? error.statusCode : 500;
        const message = error.message || 'Internal Server Error';
        return NextResponse.json({ error: message }, { status: statusCode });
    }
}
