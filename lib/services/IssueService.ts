import { IssueRepository } from '@/lib/repositories/IssueRepository';
import { UserRepository } from '@/lib/repositories/UserRepository';
import { EmailService } from '@/lib/services/EmailService';
import { IIssue, IssueType, IssuePriority, IssueStatus } from '@/models/Issue';
import { AppError } from '@/lib/utils/AppError';

export class IssueService {
    private issueRepository: IssueRepository;
    private userRepository: UserRepository;
    private emailService: EmailService;

    constructor() {
        this.issueRepository = new IssueRepository();
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
    }

    async createIssue(
        userId: string,
        data: {
            type: IssueType;
            title: string;
            description: string;
            priority?: IssuePriority;
            status?: IssueStatus;
        }
    ): Promise<IIssue> {
        const issue = await this.issueRepository.create({ ...data, userId: userId as any });

        // Fetch user to get email
        const user = await this.userRepository.findById(userId);
        if (user) {
            this.emailService.sendIssueCreatedEmail(user.email, issue.title, issue.type);
        }

        return issue;
    }

    async getUserIssues(userId: string, type?: string): Promise<IIssue[]> {
        const query: any = { userId };
        if (type) {
            query.type = type;
        }
        return this.issueRepository.find(query);
    }

    async getIssueById(issueId: string, userId: string): Promise<IIssue> {
        const issue = await this.issueRepository.findById(issueId);
        if (!issue) {
            throw new AppError('Issue not found', 404);
        }
        if (issue.userId.toString() !== userId) {
            throw new AppError('Not authorized to view this issue', 403);
        }
        return issue;
    }

    async updateIssue(issueId: string, userId: string, updates: Partial<IIssue>): Promise<IIssue> {
        const issue = await this.issueRepository.findById(issueId);
        if (!issue) {
            throw new AppError('Issue not found', 404);
        }
        if (issue.userId.toString() !== userId) {
            throw new AppError('Not authorized to update this issue', 403);
        }
        const updatedIssue = await this.issueRepository.update(issueId, updates);
        return updatedIssue!;
    }

    async deleteIssue(issueId: string, userId: string): Promise<void> {
        const issue = await this.issueRepository.findById(issueId);
        if (!issue) {
            throw new AppError('Issue not found', 404);
        }
        if (issue.userId.toString() !== userId) {
            throw new AppError('Not authorized to delete this issue', 403);
        }
        await this.issueRepository.delete(issueId);
    }
}
