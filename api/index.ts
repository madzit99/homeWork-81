import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ShortLinkRouter from "./routers/shortLink";

const app = express();
const port = 8000;

dotenv.config(); 

app.use(express.static("public"));
app.use(express.json());
app.use(cors());


app.use("/", ShortLinkRouter);

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  } catch (e) {
    console.error("Ошибка подключения к базе данных:", e);
  }

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

void run();
