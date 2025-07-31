import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  qualification: String,
  experience: Number,
  pastHospitals: String,
  currentHospital: String,
  signatureUrl: String,
  stampUrl: String,
}, { timestamps: true });

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
