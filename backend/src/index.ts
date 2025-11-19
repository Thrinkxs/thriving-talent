import express, { json, NextFunction, urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import { dbconfig } from "../src/config/dbconfig";

import { Request, Response } from "express";

import cookieParser from "cookie-parser";
import AppError from "./utils/AppError";

import clientRoute from "./api/routes/client/index.route";
import cacheConnection from "./config/cache";

// import { KeepRenderAwake } from "../src/utils/KeepRenderAwake";

// dotenv.config();

const app = express();

const port = process.env.PORT || 3001;
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://thriving-talent.vercel.app",
  "https://www.thriving-talent.vercel.app",
  "https://thriving-talent.onrender.com",
  
];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

//Connect to MongoDB
mongoose
  .connect(dbconfig.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

cacheConnection()
  .then(() => {
    console.log("Connected to Cache server");
  })
  .catch((error: any) => {
    console.error("Failed to connect to Cache", error.message);
  });

// //function to keep render awake
// KeepRenderAwake();

app.get("/", (req: Request, res: Response) => {
  res.send("Express server is running on Render Cloud");
});

app.use("/api/client", clientRoute);
// app.use("/api/admin", adminRoute);

app.use("/api/*", (req: Request, res: Response, next: NextFunction) => {
  throw new AppError(404, "Page not found");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      meesage: "Internal Server Error",
      details: error.message,
    });
  }
});

//Server
app.listen(port, () => {
  console.log("Server running on port ", port);
});
