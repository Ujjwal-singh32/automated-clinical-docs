
"use client";

import { useRouter } from 'next/navigation';// correct for Pages Router
import { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useUser } from "@clerk/nextjs";
import { toast } from 'react-toastify';
function getCurrentDateDDMMYYYY() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');     // day with leading zero if needed
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are zero-based
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

export default function PatientEntryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    age: '',
    weight: '',
    gender: '',
    dateOfVisit: getCurrentDateDDMMYYYY(),
    contactNumber: '',
    attendingPhysician: '',
    contact: ''
  });
  const { user } = useUser();
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [soapNotes, setSoapNotes] = useState(null);
  const [recordingStopped, setRecordingStopped] = useState(false); // New state to track if recording was stopped
  const [editableSoap, setEditableSoap] = useState({
    symptoms: [],
    observations: [],
    prescription: [],
    remarks: ''
  });
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        attendingPhysician: user.fullName || '',
        contact: user.phoneNumbers?.[0]?.phoneNumber || '+91 9912949209'
      }));
    }
  }, [user]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData({
      patientName: '',
      patientId: '',
      age: '',
      weight: '',
      gender: '',
      dateOfVisit: getCurrentDateDDMMYYYY(),
      contactNumber: '',
      doctorName: '',
      contact: ''
    });
    // Reset SOAP notes section
    setRecordingStopped(false);
    setSoapNotes(null);
    setEditableSoap({
      symptoms: [],
      observations: [],
      prescription: [],
      remarks: ''
    });
  };

  // 🔊 Voice Recording Logic
  const handleStartRecording = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:5050/start", { method: "POST" });
      setIsRecording(true);
    } catch (err) {
      toast.error("Failed to start voice recording.");
    }
    setLoading(false);
  };

  const handleStopRecording = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5050/stop", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("📝 Transcript:", data.transcript);
        // console.log("🧠 SOAP Notes:", data.soap_notes);

        // You can store or display it as needed
        setTranscript(data.transcript);
        setSoapNotes(data.soap_notes);
        setIsRecording(false);
        setRecordingStopped(true); // Set this to true when recording stops
        setEditableSoap(data.soap_notes);
      } else {
        toast.error("❌ Error: " + data.error);
      }
    } catch (err) {
      toast.error("❌ Failed to stop voice recording.");
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

                {/* Weight. */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
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
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    <span>🎙 Start Voice Recording</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    disabled={loading}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50 animate-pulse"
                  >
                    <span>⏹ Stop Voice Recording</span>
                  </button>
                )}

                {/* Cancel / Submit */}
                <div className="flex space-x-4 ml-auto">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>

                </div>
              </div>
            </form>
          </div>

          {/* SOAP Notes Section - Only show after recording is stopped */}
          {recordingStopped && editableSoap && (
            <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
              {/* SOAP Notes Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">SOAP Notes</h3>
                      <p className="text-green-100 text-sm">Review and edit the generated medical notes</p>
                    </div>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-medium">✨ AI Generated</span>
                  </div>
                </div>
              </div>

              {/* SOAP Notes Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Symptoms */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Symptoms</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editableSoap.symptoms.join(", ")}
                      onChange={(e) =>
                        setEditableSoap((prev) => ({
                          ...prev,
                          symptoms: e.target.value.split(",").map((s) => s.trim())
                        }))
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="List patient symptoms..."
                    />
                  </div>

                  {/* Observations */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Observations</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editableSoap.observations.join(", ")}
                      onChange={(e) =>
                        setEditableSoap((prev) => ({
                          ...prev,
                          observations: e.target.value.split(",").map((o) => o.trim())
                        }))
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Clinical observations and findings..."
                    />
                  </div>
                </div>

                {/* Prescription - Full Width */}
                <div className="mt-6 space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Prescription</span>
                  </label>
                  <textarea
                    rows={4}
                    value={editableSoap.prescription.join(", ")}
                    onChange={(e) =>
                      setEditableSoap((prev) => ({
                        ...prev,
                        prescription: e.target.value.split(",").map((p) => p.trim())
                      }))
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Prescribed medications and treatments..."
                  />
                </div>

                {/* Remarks - Full Width */}
                <div className="mt-6 space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-800">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Additional Remarks</span>
                  </label>
                  <textarea
                    rows={3}
                    value={editableSoap.remarks}
                    onChange={(e) =>
                      setEditableSoap((prev) => ({ ...prev, remarks: e.target.value }))
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Any additional notes or follow-up instructions..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Review all fields before exporting</span>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setRecordingStopped(false);
                        setSoapNotes(null);
                        setEditableSoap({
                          symptoms: [],
                          observations: [],
                          prescription: [],
                          remarks: ''
                        });
                      }}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      Reset Notes
                    </button>

                    <button
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      onClick={() => {
                        const payload = {
                          ...formData,
                          ...editableSoap,
                          clinicName: "Medicare Health",
                          clinicAddress: "Medicare Clinic, NIT Jamshedpur",
                        };

                        // Store in localStorage (safer for long data than URL)
                        localStorage.setItem("pdfData", JSON.stringify(payload));

                        router.push("/pdf-template");
                      }}
                    >
                      <span className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Export to PDF</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}