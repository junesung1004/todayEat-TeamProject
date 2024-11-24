import { connectDB } from "@/utils/dbConnect";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb"; // ObjectId를 추가합니다.

const fileHandler = async (req, res) => {
  const client = await connectDB;
  const db = client.db("todayEatTeamProject");
  const bucket = new GridFSBucket(db);

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const downloadStream = bucket.openDownloadStream(new ObjectId(id)); // ObjectId로 변환
      downloadStream.on("data", (data) => {
        res.write(data);
      });
      downloadStream.on("end", () => {
        res.end();
      });
      downloadStream.on("error", () => {
        res.status(404).json({ error: "File not found" });
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default fileHandler;
