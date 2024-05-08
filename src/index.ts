import cors from "cors";
import express, { Router } from "express";
import * as dotenv from "dotenv";
import redisClient, { redisConnect } from "./Cache/Redis";
import router from "./routers/router";
const app = express();
app.use(express.json());

dotenv.config();

const corsOption = {
  origin: "*",
  methods: "GET, POST, PUT, PATCH, DELET, HEAD",
  preflightContinue: false,
  optionSuccesStatus: 204,
};

app.use(cors(corsOption));

app.use("/api/circle", router);

app.listen(process.env.PORT, () => {
  redisConnect();
  console.log(`server running in PORT : ${process.env.PORT}`);
});
