import { Resend } from 'resend';

export class EmailService {
    private resend: Resend;

    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async sendWelcomeEmail(email: string, name: string) {
        try {
            await this.resend.emails.send({
                from: 'ApniSec <onboarding@resend.dev>', // Use resend.dev for testing if domain not verified
                to: email,
                subject: 'Welcome to ApniSec',
                html: `
          <h1>Welcome to ApniSec, ${name}!</h1>
          <p>We are excited to have you on board.</p>
          <p>Your account has been successfully created.</p>
        `,
            });
        } catch (error) {
            console.error('Failed to send welcome email:', error);
            // Don't throw, just log. Email failure shouldn't block registration flow in this context.
        }
    }

    async sendIssueCreatedEmail(email: string, issueTitle: string, issueType: string) {
        try {
            await this.resend.emails.send({
                from: 'ApniSec <notifications@resend.dev>',
                to: email,
                subject: 'New Issue Created',
                html: `
          <h1>New Issue Created</h1>
          <p>A new issue has been created on your account.</p>
          <ul>
            <li><strong>Type:</strong> ${issueType}</li>
            <li><strong>Title:</strong> ${issueTitle}</li>
          </ul>
        `,
            });
        } catch (error) {
            console.error('Failed to send issue created email:', error);
        }
    }
}
