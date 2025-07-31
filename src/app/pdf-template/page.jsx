"use client"
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
      <div className="p-8 text-center text-gray-500">Loading PDF data...</div>
    );
  }

  return (
    <PDFViewer width="100%" height="1000">
      <MedicalReportPDF data={data} />
    </PDFViewer>
  );
};

export default PDFViewerPage;
