import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/AuthService';
import { AppError } from '@/lib/utils/AppError';
import Database from '@/lib/db/db';

export class AuthHandler {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: NextRequest) {
        console.log('AuthHandler.register called');
        try {
            await Database.getInstance().connect();
            console.log('DB Connected');
            const body = await req.json();
            console.log('Request body parsed', body);
            const { name, email, password } = body;

            if (!name || !email || !password) {
                throw new AppError('Missing required fields', 400);
            }

            console.log('Calling AuthService.register');
            const result = await this.authService.register(name, email, password);
            console.log('AuthService.register successful');
            return NextResponse.json(result, { status: 201 });
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    async login(req: NextRequest) {
        try {
            await Database.getInstance().connect();
            const body = await req.json();
            const { email, password } = body;

            if (!email || !password) {
                throw new AppError('Missing required fields', 400);
            }

            const result = await this.authService.login(email, password);
            return NextResponse.json(result, { status: 200 });
        } catch (error: any) {
            return this.handleError(error);
        }
    }

    private handleError(error: any) {
        console.error('Auth Error:', error);
        const statusCode = error instanceof AppError ? error.statusCode : 500;
        const message = error.message || 'Internal Server Error';
        return NextResponse.json({
            error: message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: statusCode });
    }
}
