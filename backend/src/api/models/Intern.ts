import { Document, model, Schema } from "mongoose";

export interface IIntern extends Document {
  fullName: string;
  email: string;
  bio?: string;
  isVerified: boolean;
  phone?: string;
  address?: string;
  password?: string;
  gender: string;
  status: string;
  profileImage?: string;
  introVideo?: string;
  resume?: string;
  isDeleted?: boolean;
}

const InternSchema = new Schema<IIntern>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    isVerified: { type: Boolean, default: false },
    phone: { type: String },
    address: { type: String },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
      required: true,
    },
    profileImage: { type: String },
    introVideo: { type: String },
    resume: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Intern = model<IIntern>("Intern", InternSchema);
