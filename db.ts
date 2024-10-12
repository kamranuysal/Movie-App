import { MongoClient, Collection, Document } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URI as string);

export const connect = async (): Promise<void> => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export const getCollection = <T extends Document>(
  name: string
): Collection<T> => {
  return client.db().collection<T>(name);
};
