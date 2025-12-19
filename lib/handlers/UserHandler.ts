import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/UserService';
import { verifyAuth } from '@/lib/middleware/auth';
import { AppError } from '@/lib/utils/AppError';
import Database from '@/lib/db/db';

export class UserHandler {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getProfile(req: NextRequest) {
        try {
            await Database.getInstance().connect();
            const userId = await verifyAuth(req);
            const user = await this.userService.getProfile(userId);
            return NextResponse.json(user);
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async updateProfile(req: NextRequest) {
        try {
            await Database.getInstance().connect();
            const userId = await verifyAuth(req);
            const body = await req.json();
            const user = await this.userService.updateProfile(userId, body);
            return NextResponse.json(user);
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
