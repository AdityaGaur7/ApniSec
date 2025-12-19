import mongoose, { Schema, Document, Model } from 'mongoose';

export type IssueType = 'Cloud Security' | 'Reteam Assessment' | 'VAPT';
export type IssueStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface IIssue extends Document {
    userId: mongoose.Types.ObjectId;
    type: IssueType;
    title: string;
    description: string;
    priority: IssuePriority;
    status: IssueStatus;
    createdAt: Date;
    updatedAt: Date;
}

const IssueSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: {
            type: String,
            enum: ['Cloud Security', 'Reteam Assessment', 'VAPT'],
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            default: 'Medium',
        },
        status: {
            type: String,
            enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
            default: 'Open',
        },
    },
    { timestamps: true }
);

const Issue: Model<IIssue> = mongoose.models.Issue || mongoose.model<IIssue>('Issue', IssueSchema);

export default Issue;
