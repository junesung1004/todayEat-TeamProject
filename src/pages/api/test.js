// 몽고디비 연결 파일 경로

import { connectDB } from "@/utils/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return res.status(200).json("post 완료");
  } else if (req.method === "GET") {
    try {
      // MongoDB에 연결
      const db = (await connectDB).db("todayEatTeamProject"); // 데이터베이스 이름 변경
      const collection = db.collection("category"); // 컬렉션 이름 변경

      // 컬렉션에서 첫 번째 문서 찾기 (테스트용 쿼리)
      const result = await collection.findOne({});

      if (result) {
        return res.status(200).json({
          message: "MongoDB 연결 성공",
          data: result,
        });
      } else {
        return res.status(404).json({
          message: "데이터 없음",
        });
      }
    } catch (error) {
      console.error("MongoDB 연결 실패: ", error);
      return res.status(500).json({
        error: "MongoDB 연결 실패",
        details: error.message,
      });
    }
  } else {
    return res.status(400).json({
      message: "잘못된 요청",
    });
  }
}
