import { connectDB } from "@/utils/dbConnect";

export default async function updateDisLikeHandler(req, res) {
  const client = await connectDB;
  const db = client.db("todayEatTeamProject");

  if (req.method === "POST") {
    const { _id, name, average_price, calorie } = req.body;
    if (_id && name && average_price && calorie) {
      try {
        const result = await db.collection("disLikeFood").insertOne({ _id, name, average_price, calorie });
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error("좋아요 추가 에러:", error);
        return res.status(500).json({ error: "서버 에러" });
      }
    } else {
      return res.status(400).json({ error: "잘못된 데이터" });
    }
  } else if (req.method === "DELETE") {
    const { _id } = req.body;
    if (_id) {
      try {
        const result = await db.collection("likeFood").deleteOne({ _id });
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error("좋아요 삭제 에러:", error);
        return res.status(500).json({ error: "서버 에러" });
      }
    } else {
      return res.status(400).json({ error: "잘못된 데이터" });
    }
  } else {
    return res.status(405).json({ error: "허용되지 않은 메소드" });
  }
}
