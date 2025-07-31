
"use client";
import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MedicalReportPDF from "@/components/ui/MedicalReport";

const PDFViewerPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("pdfData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

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
      <div className="shadow-2xl rounded-2xl overflow-hidden border border-cyan-300 bg-white max-w-[1280px] w-full transition-transform hover:scale-[1.02] hover:shadow-3xl duration-300">
        <PDFViewer
          width="100%"
          height={1100}
          showToolbar
          style={{
            borderRadius: "1.25rem",
            boxShadow: "0 12px 36px rgba(56,189,248,0.3)",
          }}
        >
          <MedicalReportPDF data={data} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFViewerPage;