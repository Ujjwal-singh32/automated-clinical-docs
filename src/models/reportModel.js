import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true,
  },
  attendingPhysician: {
    type: String,
    required: true,
    default: "Dr. Healthcare",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  department: {
    type: String,
    required: true,
  },
  medicalLicense: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male"
  },
  bloodType: {
    type: String,
    default: "—",
  },
  weight: {
    type: String, // You can change to Number if you always store in KG only
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String],
    default: [],
  },
  observations: {
    type: [String],
    default: [],
  },
  prescription: {
    type: [String],
    default: [],
  },
  remarks: {
    type: String,
    default: '',
  }
});

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;
