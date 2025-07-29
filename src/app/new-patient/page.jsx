"use client";

import { useRouter } from 'next/navigation';// correct for Pages Router

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Head from 'next/head';
export default function PatientEntryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    age: '',
    gender: '',
    dateOfVisit: '29/07/2025',
    contactNumber: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [soapNotes, setSoapNotes] = useState(null);
  const [editableSoap, setEditableSoap] = useState({
    symptoms: [],
    observations: [],
    prescription: [],
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData({
      patientName: '',
      patientId: '',
      age: '',
      gender: '',
      dateOfVisit: '29/07/2025',
      contactNumber: ''
    });
  };

  // 🔊 Voice Recording Logic
  const handleStartRecording = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/start", { method: "POST" });
      setIsRecording(true);
    } catch (err) {
      alert("Failed to start voice recording.");
    }
    setLoading(false);
  };

  const handleStopRecording = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/stop", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("📝 Transcript:", data.transcript);
        console.log("🧠 SOAP Notes:", data.soap_notes);

        // You can store or display it as needed
        setTranscript(data.transcript);
        setSoapNotes(data.soap_notes);
        setIsRecording(false);
        setEditableSoap(data.soap_notes);
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      alert("❌ Failed to stop voice recording.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Patient Entry Form</h2>
            <p className="mt-2 text-gray-600">Please fill in the patient information below</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold text-white">Patient Information</h3>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Patient Info Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Patient ID */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Patient ID</label>
                  <input
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date of Visit */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Date of Visit</label>
                  <input
                    type="text"
                    name="dateOfVisit"
                    value={formData.dateOfVisit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {/* Voice Recording Buttons */}
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    disabled={loading}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <span>🎙️ Start Voice Recording</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    disabled={loading}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <span>⏹️ Stop Voice Recording</span>
                  </button>
                )}

                {/* Cancel / Submit */}
                <div className="flex space-x-4 ml-auto">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Patient Info
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
      {editableSoap && (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🧾 Editable SOAP Notes</h2>

          {/* Symptoms */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Symptoms</label>
            <textarea
              rows={2}
              value={editableSoap.symptoms.join(", ")}
              onChange={(e) =>
                setEditableSoap((prev) => ({
                  ...prev,
                  symptoms: e.target.value.split(",").map((s) => s.trim())
                }))
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Observations */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Observations</label>
            <textarea
              rows={2}
              value={editableSoap.observations.join(", ")}
              onChange={(e) =>
                setEditableSoap((prev) => ({
                  ...prev,
                  observations: e.target.value.split(",").map((o) => o.trim())
                }))
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Prescription */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Prescription</label>
            <textarea
              rows={3}
              value={editableSoap.prescription.join(", ")}
              onChange={(e) =>
                setEditableSoap((prev) => ({
                  ...prev,
                  prescription: e.target.value.split(",").map((p) => p.trim())
                }))
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Remarks */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Remarks</label>
            <textarea
              rows={2}
              value={editableSoap.remarks}
              onChange={(e) =>
                setEditableSoap((prev) => ({ ...prev, remarks: e.target.value }))
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div className="text-right">
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => {
                const payload = {
                  ...formData,
                  ...editableSoap,
                  doctorName: "Dr. HOD. Lanth", // or make this dynamic
                  clinicName: "Rakshaa Health Clinic",
                  clinicAddress: "123 Wellness Street, Delhi",
                  contact: "+91 9876543210",
                };

                // Store in localStorage (safer for long data than URL)
                localStorage.setItem("pdfData", JSON.stringify(payload));

                router.push("/pdf-template");
              }}

            >
              📄 Export to PDF
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
