import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@/lib/repositories/UserRepository';
import { EmailService } from '@/lib/services/EmailService';
import { AppError } from '@/lib/utils/AppError';
import { IUser } from '@/models/User';

export class AuthService {
    private userRepository: UserRepository;
    private emailService: EmailService;

    constructor() {
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
    }

    async register(name: string, email: string, password: string): Promise<{ user: IUser; token: string }> {
        console.log('AuthService.register: Checking if user exists');
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError('User already exists', 400);
        }

        console.log('AuthService.register: Hashing password');
        const passwordHash = await bcrypt.hash(password, 12);

        console.log('AuthService.register: Creating user');
        const user = await this.userRepository.create({
            name,
            email,
            passwordHash,
        });
        console.log('AuthService.register: User created', user._id);

        // Send welcome email asynchronously
        try {
            console.log('AuthService.register: Sending welcome email');
            await this.emailService.sendWelcomeEmail(email, name);
        } catch (emailError) {
            console.error('AuthService.register: Failed to send welcome email', emailError);
            // Continue execution, don't fail registration
        }

        const token = this.signToken((user._id as unknown) as string);
        return { user, token };
    }

    async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = this.signToken((user._id as unknown) as string);
        return { user, token };
    }

    private signToken(id: string): string {
        return jwt.sign({ id }, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });
    }
}
