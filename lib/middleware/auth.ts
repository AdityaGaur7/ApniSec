import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { AppError } from '@/lib/utils/AppError';

export async function verifyAuth(req: NextRequest): Promise<string> {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Not authenticated', 401);
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        return decoded.id;
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}
