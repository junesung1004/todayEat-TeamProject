import { connectDB } from "@/utils/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { categories, price } = req.query;

    try {
      const client = await connectDB;
      const db = client.db("todayEatTeamProject");
      const foodCollection = db.collection("food");

      //필터 조건 생성
      const query = {};

      // 카테고리 필터링
      if (categories) {
        const categoryArray = categories.split(",");
        query.category = { $in: categoryArray };
      }

      // 가격 필터링
      if (price) {
        if (price === "eight") {
          query.average_price = { $lte: 8000 };
        } else if (price === "ten") {
          query.average_price = { $lte: 10000 };
        } else if (price === "fifteen") {
          query.average_price = { $lte: 15000 };
        }
      }

      const items = await foodCollection.find(query).toArray();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error("카테고리 별로 아이템 가져오기 에러 : ", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
