import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToClouldinary";

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

export const uploadFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.files) {
    console.error("req.files is undefined.");
    next();
  } else if (Array.isArray(req.files)) {
    console.error("req.files is a File array, not an object with keys.");
    next();
  } else {
    for (const key in req.files) {
      req.body[key] = [];

      const array = req.files[key];
      for (const item of array) {
        try {
          const result = await uploadToCloudinary(item.buffer);
          req.body[key].push(result);
        } catch (error) {
          console.error(error);
        }
      }
    }

    next();
  }
};
