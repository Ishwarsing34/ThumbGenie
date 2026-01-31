import mongoose, { Schema, Document } from "mongoose";

export interface IThumbnail extends Document {
  userId: string |  Schema.Types.ObjectId;
  title: string;
  description?: string;
  style: "Bold & Graphic" | "Tech/Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
  aspect_ratio?: "16:9" | "1:1" | "9:16";
  color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
  text_overlay?: boolean;
  image_url?: string;
  prompt_used?: string;
  user_prompt?: string;
  isGenerating?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ThumbnailSchema = new Schema<IThumbnail>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    style: {
      type: String,
      enum: ["Bold & Graphic", "Tech/Futuristic", "Minimalist", "Photorealistic", "Illustrated"],
      required: true,
    },

    aspect_ratio: {
      type: String,
      enum: ["16:9", "1:1", "9:16"],
      default: "16:9",
    },

    color_scheme: {
      type: String,
      enum: ["vibrant", "sunset", "forest", "neon", "purple", "monochrome", "ocean", "pastel"],
      default: "vibrant",
    },

    text_overlay: {
      type: Boolean,
      default: false,
    },

    image_url: {
      type: String,
      default: "",
    },

    prompt_used: {
      type: String,
      default: "",
    },

    user_prompt: {
      type: String,
      default: "",
    },

    isGenerating: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ThumbnailModel = mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema);

export default ThumbnailModel;
