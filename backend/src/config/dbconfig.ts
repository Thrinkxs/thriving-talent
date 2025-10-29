import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_USERNAME: string = process.env.MONGO_USERNAME || "";
const MONGODB_PASSWORD: string = process.env.MONGO_PASSWORD || "";

let MONGODB_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_MONGO_DB
    : `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@thriving.nlvjz3y.mongodb.net/production`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3001;

export const dbconfig = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
