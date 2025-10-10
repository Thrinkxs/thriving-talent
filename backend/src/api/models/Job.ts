import mongoose, { InferSchemaType, Schema } from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },
  location: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  type: {
    type: String,
    enum: ["full-time", "part-time", "remote", "internship"],
    required: true,
  },
 
},
{
  timestamps: true,
}
);

type Job = InferSchemaType<typeof JobSchema>;
const Job = mongoose.model("Job", JobSchema);
export default Job;
