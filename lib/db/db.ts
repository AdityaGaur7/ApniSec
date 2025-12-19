import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

class Database {
  private static instance: Database;
  private connection: mongoose.Connection | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<mongoose.Connection> {
    if (this.connection) {
      return this.connection;
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    // Cache the connection across hot reloads in development
    let cached = global.mongoose;

    if (!cached) {
      cached = global.mongoose = { conn: null, promise: null };
    }

    if (cached.conn) {
      this.connection = cached.conn;
      return this.connection;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose.connection;
      });
    }

    try {
      this.connection = await cached.promise;
      cached.conn = this.connection;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return this.connection;
  }
}

export default Database;
