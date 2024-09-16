import { connectDB } from "@/utils/dbConnect";

export default async function handler(req, res) {
  try {
    console.log("Connecting to MongoDB...");
    const client = await connectDB;
    console.log("Connected to MongoDB.");
    const db = client.db("todayEatTeamProject");
    const categoryCollection = db.collection("category");
    const categories = await categoryCollection.find().toArray();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
