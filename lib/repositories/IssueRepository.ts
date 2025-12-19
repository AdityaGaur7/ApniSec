import Issue, { IIssue } from '@/models/Issue';
import { BaseRepository } from './BaseRepository';

export class IssueRepository extends BaseRepository<IIssue> {
    constructor() {
        super(Issue);
    }

    async findByUserId(userId: string): Promise<IIssue[]> {
        return this.find({ userId });
    }
}
