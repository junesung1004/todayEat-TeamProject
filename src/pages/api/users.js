import { connectDB } from "@/utils/dbConnect";

export default async function handler(req, res) {
  try {
    const client = await connectDB;
    const db = client.db("todayEatTeamProject");
    const usersCollection = db.collection("users");
    const users = await usersCollection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
