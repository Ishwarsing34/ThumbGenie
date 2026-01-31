

//controllers to get all users thumbnails


  
import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";

export const getUsersThumbnails = async (req: Request, res: Response) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const thumbnails = await Thumbnail.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      thumbnails,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getThumbnailById = async (req: Request, res: Response) => {
  try {
    const userId = req.session?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const thumbnails = await Thumbnail.findOne({
      _id: id,
      userId,
    });

    if (!thumbnails) {
      return res.status(404).json({
        message: "Thumbnail not found",
      });
    }

    return res.status(200).json({
      thumbnails,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};




