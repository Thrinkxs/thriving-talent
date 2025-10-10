import mongoose, { InferSchemaType, Schema } from "mongoose";

const EmployerSchema = new mongoose.Schema({
  fullName: { type: String, 
    required: true 
},
  companyName: { 
    type: String, required: true
 },
  email: { 
    type: String,
     required: true,
     unique: true },
  password: { 
    type: String,
     required: true 
    },
});

type Employer = InferSchemaType<typeof EmployerSchema>;
const Employer = mongoose.model("Employer", EmployerSchema);
export default Employer;
