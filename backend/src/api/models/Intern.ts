import mongoose, { InferSchemaType, Schema } from "mongoose";

const InternSchema = new mongoose.Schema({
  fullName: { 
    type: String,
     required: true 
    },
  email: { 
    type: String, 
    required: true, 
    unique: true
 },
  isVerified: {
     type: Boolean, 
     default: false 
    },
  phone: { 
    type: String
 },
  password: { 
    type: String, 
    required: true
 },

  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say"],
    required: true,
  },
  profileImage: { 
    type: String
 },
 introVideo: {
    type: String
 },

});

type Intern = InferSchemaType<typeof InternSchema>;
const Intern = mongoose.model("Intern", InternSchema);

export default Intern;
