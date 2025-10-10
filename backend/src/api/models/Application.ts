import mongoose, { InferSchemaType, Schema } from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  intern: { type: mongoose.Schema.Types.ObjectId, ref: "Intern", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },

},
{
  timestamps: true,
});

type Application = InferSchemaType<typeof ApplicationSchema>;
const Application = mongoose.model("Application", ApplicationSchema);
export default Application;