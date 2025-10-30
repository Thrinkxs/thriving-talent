import { Document, model, Schema } from "mongoose";

export interface IIntern extends Document {
  fullName: string;
  email: string;
  isVerified: boolean;
  phone?: string;
  password?: string;
  gender: string;
  status: string;
  profileImage?: string;
  introVideo?: string;
  isDeleted?: boolean;
}

const InternSchema = new Schema<IIntern>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  phone: { type: String },
  password: { type: String, required: true },
  status: { type: String, enum: ["active", "suspended"], default: "active" },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  profileImage: { type: String },
  introVideo: { type: String },
  isDeleted: { type: Boolean, default: false },
});

export const Intern = model<IIntern>("Intern", InternSchema);
