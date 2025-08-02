"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { toast } from 'react-toastify';
import MedicalReportPDF from "@/components/ui/MedicalReport";
import axios from "axios";

const PDFViewerPage = () => {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  useEffect(() => {
    let key = "pdfData";
    let stored = localStorage.getItem(key);

    // If pdfData is not found, try pdfDataView (for view-only)
    if (!stored) {
      key = "pdfDataView";
      stored = localStorage.getItem(key);
    }

    if (stored) {
      const parsedData = JSON.parse(stored);
      // console.log("stored", parsedData);
      setData(parsedData);

      // Call the upload API only if the data is from "pdfData"
      if (key === "pdfData") {
        axios
          .post("/api/report/upload", {
            reportId: generateUniqueId(),
            attendingPhysician: parsedData.attendingPhysician || "Dr. Unknown",
            date: new Date(parsedData.dateOfVisit),
            department: "General", // set dynamically if needed
            medicalLicense: "LIC123456",
            patientName: parsedData.patientName,
            age: parseInt(parsedData.age),
            gender: parsedData.gender,
            bloodType: "A+",
            weight: parsedData.weight,
            contact: parsedData.contact,
            symptoms: parsedData.symptoms || [],
            observations: parsedData.observations || [],
            prescription: parsedData.prescription || [],
            remarks: parsedData.remarks || "",
          })
          // .then((res) => console.log("Report uploaded:", res.data))
          .catch((err) => console.error("Upload error:", err));
      }
    }
  }, []);


  const generateUniqueId = () => {
    return "RPT-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  useEffect(() => {
    if (user?.id) {
      axios
        .post("/api/doctor/get-profile", {
          userId: user.id,
        })
        .then((res) => {
          setDoctorProfile(res.data.doctor);
          // console.log("Doctor profile:", res.data.doctor);
        })
        .catch((err) => {
          console.error("Doctor profile fetch error:", err);
        });
    }
  }, [user]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-100">
        <div className="rounded-xl p-10 bg-white shadow-lg text-center text-slate-500 font-semibold text-lg tracking-wide animate-pulse border border-blue-100 max-w-md">
          Loading PDF data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-[#e0f7fa] via-[#f1f5f9] to-[#e0e7ff] min-h-screen w-full flex items-center justify-center p-8">
      <div className="shadow-2xl rounded-2xl overflow-hidden border border-cyan-300 bg-white max-w-[1280px] w-full duration-300">
        <PDFViewer
          width="100%"
          height={1100}
          showToolbar
          style={{
            borderRadius: "1.25rem",
            boxShadow: "0 12px 36px rgba(56,189,248,0.3)",
          }}
        >
          <MedicalReportPDF data={data} doctor={doctorProfile}/>
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFViewerPage;
