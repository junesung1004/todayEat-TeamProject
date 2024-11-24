import { connectDB } from "@/utils/dbConnect";
import NextAuth from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function updateLikeHandler(req, res) {
  const client = await connectDB;
  const db = client.db("todayEatTeamProject");

  // getServerSession 사용
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "로그인 필요" });
  }
  const userId = session.user.id;

  if (req.method === "POST") {
    const { _id, name, image } = req.body;
    if (_id && name && image) {
      try {
        const result = await db.collection("likeFood").insertOne({ _id, name, image, userId });
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error("좋아요 추가 에러:", error);
        return res.status(500).json({ error: error.message || "서버 에러" });
      }
    } else {
      return res.status(400).json({ error: "잘못된 데이터" });
    }
  } else if (req.method === "DELETE") {
    const { _id } = req.body;
    if (_id) {
      try {
        const result = await db.collection("likeFood").deleteOne({ _id, userId });
        return res.status(200).json({ success: true, data: result });
      } catch (error) {
        console.error("좋아요 삭제 에러:", error);
        return res.status(500).json({ error: "서버 에러" });
      }
    } else {
      return res.status(400).json({ error: "잘못된 데이터" });
    }
  } else if (req.method === "GET") {
    try {
      const likeFoods = await db.collection("likeFood").find({ userId }).toArray();
      return res.status(200).json({ success: true, data: likeFoods });
    } catch (error) {
      console.error("좋아요 목록 가져오기 에러:", error);
      return res.status(500).json({ error: "서버 에러" });
    }
  } else {
    return res.status(405).json({ error: "허용되지 않은 메소드" });
  }
}
