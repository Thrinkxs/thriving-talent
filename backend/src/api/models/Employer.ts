import { Document, model, Schema } from "mongoose";

export interface IEmployer extends Document {
  fullName: string;
  companyName: string;
  email: string;
  password?: string;
  isVerified: boolean;
  isDeleted: boolean;
  __v?: number;
}

const EmployerSchema = new Schema<IEmployer>(
  {
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
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
