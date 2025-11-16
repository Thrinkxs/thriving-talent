import { Document, model, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  company: Schema.Types.ObjectId;
  status: string;
  location: string;
  type: string;
  __v?: number;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    location: { type: String },
    type: {
      type: String,
      enum: ["full-time", "part-time", "negotiable"],
      required: true,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const Job = model<IJob>("Job", JobSchema);
