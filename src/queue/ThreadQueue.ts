import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../config";
import * as fs from "fs";
import { addthread } from "../utils/ThreadUtil";
import amqp from "amqplib";
import { buffer } from "stream/consumers";
import { resolve } from "path";
import { rejects } from "assert";

const prisma = new PrismaClient();
export default new (class threadQueue {
  private readonly UserRepository = prisma.user;
  private readonly ThreadRepository = prisma.thread;

  async addThreadQueue(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error } = addthread.validate(body);
      if (error) return res.status(400).json({ massage: error.message });

      const userId = res.locals.loginSession.User.id;

      const userSelect = await this.UserRepository.findUnique({
        where: { id: userId },
      });
      if (!userSelect)
        return res.status(404).json({ massage: "User not found" });

      let image = req.file;
      let image_url = "";

      if (!image) {
        image_url = "";
      } else {
        const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
          folder: "Circle53",
        });
        image_url = cloudinaryUpload.secure_url;
        fs.unlinkSync(image.path);
      }

      const payload = {
        content: body.content,
        image: image_url,
        user: res.locals.loginSession.user.id,
      };

      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      await channel.assertQueue("thread_circle53_queue");
      channel.sendToQueue(
        "thread_circle53_queue",
        Buffer.from(JSON.stringify(payload))
      );

      let rabbitData;

      const massageProssesed = new Promise<void>((resolve, rejects) => {
        channel.consume("thread_circle53_queue", async (massage) => {
          if (massage) {
            try {
              const payload = JSON.parse(massage.content.toString());
              const rabbit = await this.ThreadRepository.create({
                data: {
                  content: payload.content,
                  image: payload.image_url,
                  created_at: new Date(),
                  user: { connect: { id: userId } },
                },
              });
              rabbitData = rabbit;
              channel.ack(massage);
              resolve();
            } catch (error) {
              console.log("error prosses");
            }
          }
        });
      });

      await massageProssesed;
      await channel.close();
      await connection.close();

      return res.status(201).json({
        code: 201,
        status: "succes",
        massage: "add thread from rabbit MQ succes",
        data: rabbitData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ massage: error });
    }
  }
})();
