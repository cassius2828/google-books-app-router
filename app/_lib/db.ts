import mongoose from "mongoose";
import { MongoClient } from "mongodb";

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  return uri;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

global.mongooseCache ??= {
  conn: null,
  promise: null,
};
const cached: MongooseCache = global.mongooseCache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      family: 4,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(getMongoUri(), opts).then((m) => {
      console.log("Connected to MongoDB via Mongoose");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Separate MongoClient singleton for the NextAuth MongoDB adapter,
 * which requires a native MongoClient rather than Mongoose.
 */
export function getMongoClient(): Promise<MongoClient> {
  if (!global.mongoClientPromise) {
    const p = Promise.resolve().then(() => {
      const client = new MongoClient(getMongoUri());
      return client.connect();
    });
    p.catch(() => {});
    global.mongoClientPromise = p;
  }
  return global.mongoClientPromise;
}

export { mongoose };
