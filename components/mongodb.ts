import { MongoClient } from "mongodb";
if (!process.env.MONGOCLIENTID) {
  throw new Error("Invalid environment variable");
}
const uri = process.env.MONGOCLIENTID;

const client: MongoClient = new MongoClient(uri);
const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
