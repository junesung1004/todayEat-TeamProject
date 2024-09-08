//몽고db 연결하는 파일

import { MongoClient } from "mongodb";

const url = "";
const options = {};
let connectDB;

if (process.env.NODE_ENV === "development") {
  //npm run dev일때
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  //npm run build 일때
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
