import { Request, Response, NextFunction } from "express";
import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();
//Cloudirady
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
});
//End Cloudirady

const streamUpload = (buffer: any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({ resource_type: "auto"},(error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: any) => {
  let result:any = await streamUpload(buffer);
  return result.secure_url;
};

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
      if (!req.file) {
          throw new Error("No file provided");
      }

      const result = await uploadToCloudinary(req.file.buffer);
      if (req.file.fieldname) {
          req.body[req.file.fieldname] = result;
      }
  } catch (error) {
      console.error("Upload error:", error);
  }

  next();
};

