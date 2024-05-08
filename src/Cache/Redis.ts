import { createClient } from "redis";
import * as dotenv from "dotenv";
import { error, log } from "console";
dotenv.config();

const redisClient = createClient({
  password: process.env.REDIS_password,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
  },
});

//untuk mengetahui connect apa belum
redisClient.on("error", (error) => {
  console.log("redis client error", error);
  process.exit(1);
});

export default redisClient;

export async function redisConnect() {
  try {
    console.log("connected to redis, ready");
  } catch (error) {
    console.log("redis error", error);
    process.exit(1);
  }
}

export const DEFAULT_EXPIRATION = 3600;
