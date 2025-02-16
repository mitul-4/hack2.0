// pages/api/posts.ts
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-uri";
const DATABASE_NAME = "test";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DATABASE_NAME);
    const postsCollection = db.collection("posts");

    if (req.method === "GET") {
      const posts = await postsCollection.find().toArray();
      res.status(200).json(posts);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    client.close();
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
