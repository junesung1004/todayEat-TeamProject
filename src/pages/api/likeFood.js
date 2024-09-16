import { connectDB } from "@/utils/dbConnect";

export default async function updateLikeHandler(req, res) {
  if (req.method === "POST") {
    const { title, price, calories } = req.body;

    if (title && price && calories) {
      try {
        const client = await connectDB;
        const db = client.db("todayEatTeamProject");
        const result = await db.collection("likeFood").insertOne({ title, price, calories });
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error("POST 요청 에러 : ", error);
        return res.status(500).json({ error: "서버기능 오류" });
      }
    } else {
      return res.status(400).json({ error: "잘못된 요청 데이터" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
