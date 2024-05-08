import { error } from "console";
import { any } from "joi";
import multer from "multer";
import path from "path";
import authmiddleware from "./AuthMiddleware";

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.filename + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startwith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("file type not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;
