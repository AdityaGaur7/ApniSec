interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

export class RateLimiter {
    private store: RateLimitStore = {};
    private limit: number;
    private windowMs: number;

    constructor(limit: number = 100, windowMs: number = 15 * 60 * 1000) {
        this.limit = limit;
        this.windowMs = windowMs;
    }

    public check(key: string): { allowed: boolean; remaining: number; reset: number } {
        const now = Date.now();
        const record = this.store[key];

        if (!record || now > record.resetTime) {
            this.store[key] = {
                count: 1,
                resetTime: now + this.windowMs,
            };
            return {
                allowed: true,
                remaining: this.limit - 1,
                reset: this.store[key].resetTime,
            };
        }

        if (record.count >= this.limit) {
            return {
                allowed: false,
                remaining: 0,
                reset: record.resetTime,
            };
        }

        record.count += 1;
        return {
            allowed: true,
            remaining: this.limit - record.count,
            reset: record.resetTime,
        };
    }

    public cleanup() {
        const now = Date.now();
        for (const key in this.store) {
            if (this.store[key].resetTime < now) {
                delete this.store[key];
            }
        }
    }
}

// Singleton instance for global rate limiting
export const globalRateLimiter = new RateLimiter();
