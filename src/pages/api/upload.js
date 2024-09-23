import { MongoClient, GridFSBucket } from "mongodb";
import formidable from "formidable";
import { connectDB } from "@/utils/dbConnect";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadHandler = async (req, res) => {
  const client = await connectDB;
  const db = client.db("todayEatTeamProject");
  const bucket = new GridFSBucket(db);

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to parse files" });
    }

    const file = files.file[0];

    const uploadStream = bucket.openUploadStream(file.originalFilename);
    const readStream = fs.createReadStream(file.filepath);

    readStream.pipe(uploadStream);

    uploadStream.on("finish", async () => {
      const fileUrl = `https://todayeatfoods.netlify.app/api/files/${uploadStream.id}`;

      // 이미지 URL과 추가 정보를 데이터베이스에 저장
      const imageData = {
        url: fileUrl,
        // 추가 정보를 여기에 추가
        title: file.originalFilename, // 예시로 제목 추가
        createdAt: new Date(),
      };

      // 이미지 데이터 저장
      const imagesCollection = db.collection("images");
      await imagesCollection.insertOne(imageData);

      res.status(200).json({ url: fileUrl });
    });

    uploadStream.on("error", (error) => {
      res.status(500).json({ error: "Failed to upload file" });
    });
  });
};

export default uploadHandler;
