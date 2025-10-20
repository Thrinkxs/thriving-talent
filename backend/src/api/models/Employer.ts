import { Document, model, Schema } from "mongoose";

export interface IEmployer extends Document {
  fullName: string;
  companyName: string;
  description?: string;
  images?: string[];
  email: string;
  password?: string;
  isVerified: boolean;
  status?: string;
  isDeleted: boolean;
  __v?: number;
}

const EmployerSchema = new Schema<IEmployer>(
  {
    fullName: { type: String, index: true, trim: true, required: true },
    companyName: { type: String, index: true, trim: true, required: true },
    description: { type: String, trim: true },
    images: { type: [String], default: [] },
    email: { type: String, index: true, trim: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
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

export const Employer = model<IEmployer>("Employer", EmployerSchema);
