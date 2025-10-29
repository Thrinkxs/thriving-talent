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
  registrationNumber?: string;
  sector?: string;
  industry?: string;
  numberOfEmployees?: number;
  roleInOrganization?: string;
  address?: string;
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
    registrationNumber: { type: String, trim: true },
    sector: { type: String, trim: true },
    industry: { type: String, trim: true },
    numberOfEmployees: { type: Number },
    roleInOrganization: { type: String, trim: true },
    address: { type: String, trim: true },
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
