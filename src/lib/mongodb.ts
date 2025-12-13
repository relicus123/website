import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV !== "production") {
  console.warn("⚠️ MONGODB_URI not defined. Database features will not work.");
}

/**
 * OPTIMIZED MongoDB connection with caching and connection pooling
 * - Prevents repeated connections
 * - Fast reconnection with cached promise
 * - Production-ready settings for instant API responses
 */
interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: GlobalMongoose | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

// Performance-optimized connection options
const MONGOOSE_OPTIONS = {
  bufferCommands: false, // Disable buffering for immediate errors
  maxPoolSize: 10, // Maximum 10 concurrent connections
  serverSelectionTimeoutMS: 5000, // Fast timeout (5s)
  socketTimeoutMS: 45000, // Socket timeout
  family: 4, // Use IPv4, skip IPv6 resolution delay
  connectTimeoutMS: 10000, // Connection timeout
  maxIdleTimeMS: 30000, // Close idle connections after 30s
  minPoolSize: 2, // Keep minimum 2 connections ready
};

async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // Return cached connection instantly
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse pending connection promise
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, MONGOOSE_OPTIONS)
      .then((mongooseInstance) => {
        // Only log in development
        if (process.env.NODE_ENV === "development") {
          console.log("✅ MongoDB connected with connection pooling");
        }
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
        cached.promise = null; // Clear failed promise
        throw error;
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

// Graceful shutdown handler
if (process.env.NODE_ENV !== "production") {
  process.on("SIGINT", async () => {
    if (cached.conn) {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    }
  });
}

export default connectDB;
