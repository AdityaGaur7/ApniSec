import { UserRepository } from '@/lib/repositories/UserRepository';
import { IUser } from '@/models/User';
import { AppError } from '@/lib/utils/AppError';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getProfile(userId: string): Promise<IUser> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }

    async updateProfile(userId: string, data: Partial<IUser>): Promise<IUser> {
        const user = await this.userRepository.update(userId, data);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    }
}
