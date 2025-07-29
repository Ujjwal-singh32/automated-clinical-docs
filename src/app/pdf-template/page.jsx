"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
export default function PdfPage() {
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

  return <PdfTemplate data={data} />;
}

const PdfTemplate = ({ data }) => {
  return (
    <div className="mx-auto my-8 p-0 font-sans text-slate-800 relative overflow-hidden print:bg-white print:shadow-none"
      style={{
        width: '794px',
        minHeight: '1123px',
        maxWidth: '794px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5)',
        borderRadius: '24px',
        border: '2px solid #e2e8f0',
        overflow: 'hidden',
        position: 'relative',
        pageBreakInside: 'avoid',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
          repeating-linear-gradient(45deg, transparent 0px, transparent 40px, rgba(148, 163, 184, 0.03) 40px, rgba(148, 163, 184, 0.03) 42px)
        `,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(15deg)',
        fontSize: '200px',
        background: 'linear-gradient(135deg, #3b82f6, #10b981)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        opacity: 0.04,
        fontWeight: '300',
        zIndex: 0,
        pointerEvents: 'none',
        fontFamily: 'system-ui',
      }}>✚</div>
      {/* Header */}
      <div className="flex items-center gap-8 px-12 pt-12 pb-8 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 shadow-lg z-10 relative rounded-t-2xl">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-24 h-24 flex items-center justify-center shadow-2xl border border-white/30">
          <span className="text-5xl text-white drop-shadow-lg">🏥</span>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-3 font-sans tracking-tight drop-shadow-sm">
            {data.clinicName || 'Medical Center'}
          </h1>
          <div className="flex flex-col space-y-2">
            <p className="text-lg text-blue-50 font-medium flex items-center gap-2">
              <span className="text-xl">📍</span>
              {data.clinicAddress || '123 Medical Plaza, Healthcare City'}
            </p>
            <p className="text-base text-blue-100 flex items-center gap-2">
              <span className="text-lg">📞</span>
              {data.contact || 'Phone: (555) 123-4567'}
            </p>
          </div>
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-full border-2 border-white/20 flex items-center justify-center">
          <span className="text-2xl text-white">⚕️</span>
        </div>
      </div>
      <Separator className="my-0" />
      {/* Patient Information */}
      <div className="px-12 pt-10 pb-6">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">👨‍⚕️</span>
              </div>
              <div className="text-lg font-semibold text-slate-700">
                Attending Physician
              </div>
            </div>
            <div className="text-xl text-slate-800 font-semibold">
              {data.doctorName || 'Dr. John Smith, MD'}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📅</span>
              </div>
              <div className="text-lg font-semibold text-slate-700">
                Date of Visit
              </div>
            </div>
            <div className="text-xl text-slate-800 font-semibold">
              {data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">👤</span>
            </div>
            <div className="text-lg font-semibold text-slate-700">
              Patient Name
            </div>
          </div>
          <div className="text-2xl text-slate-800 font-bold tracking-wide">
            {data.patientName || 'Jane Doe'}
          </div>
        </div>
      </div>
      <Separator className="my-0" />
      {/* Symptoms */}
      <div className="px-12 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">🤒</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 font-sans tracking-tight">Symptoms</h2>
          <div className="flex-1 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 font-sans flex items-center gap-3">
            <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">📝</span>
            Reported Symptoms
          </h3>
          <div className="space-y-4">
            {(data.symptoms && data.symptoms.length > 0) ? (
              data.symptoms.map((symptom, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-red-200 shadow-sm hover:shadow-md transition-all duration-200 relative group">
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">{idx + 1}</Badge>
                  <div className="text-lg text-slate-700 font-medium pr-16 leading-relaxed">{symptom}</div>
                </div>
              ))
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-red-200 shadow-sm">
                <div className="text-lg text-slate-700 font-medium leading-relaxed">• Fever and chills</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Separator className="my-0" />
      {/* Observations */}
      <div className="px-12 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">🔍</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 font-sans tracking-tight">Observations</h2>
          <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 font-sans flex items-center gap-3">
            <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">📊</span>
            Clinical Findings
          </h3>
          <div className="space-y-4">
            {(data.observations && data.observations.length > 0) ? (
              data.observations.map((observation, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-200 relative group">
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">{idx + 1}</Badge>
                  <div className="text-lg text-slate-700 font-medium pr-16 leading-relaxed">{observation}</div>
                </div>
              ))
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-emerald-200 shadow-sm">
                <div className="text-lg text-slate-700 font-medium leading-relaxed">• Temperature: 101.2°F (38.4°C)</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Separator className="my-0" />
      {/* Prescription */}
      <div className="px-12 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">💊</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 font-sans tracking-tight">Prescription</h2>
          <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border-2 border-purple-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 font-sans flex items-center gap-3">
            <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">📝</span>
            Prescribed Medications
          </h3>
          <div className="space-y-4">
            {(data.prescription && data.prescription.length > 0) ? (
              data.prescription.map((med, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 relative group">
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg">{idx + 1}</Badge>
                  <div className="text-lg text-slate-700 font-medium pr-16 leading-relaxed">{med}</div>
                </div>
              ))
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-purple-200 shadow-sm">
                <div className="text-lg text-slate-700 font-medium leading-relaxed">• Acetaminophen 500mg - 1 tablet every 6 hours as needed for pain</div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-8 shadow-md">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 font-sans flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center text-white">⚠️</span>
            Important Instructions
          </h3>
          <ul className="pl-6 text-base text-slate-700 space-y-3 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              Take medications as prescribed
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              Complete the full course of antibiotics if prescribed
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              Contact your doctor if you experience any adverse reactions
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              Follow up appointment recommended in 2 weeks
            </li>
          </ul>
        </div>
      </div>
      <Separator className="my-0" />
      {/* Remarks */}
      <div className="px-12 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">💭</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 font-sans tracking-tight">Remarks</h2>
          <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 font-sans flex items-center gap-3">
            <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">📋</span>
            Additional Notes
          </h3>
          <div className="space-y-4">
            {(data.remarks && data.remarks.length > 0) ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200 relative group">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">1</Badge>
                <div className="text-lg text-slate-700 font-medium pr-16 leading-relaxed">
                  {data.remarks} {/* Combine all remarks into a single paragraph */}
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-orange-200 shadow-sm">
                <div className="text-lg text-slate-700 font-medium leading-relaxed">
                  • Patient should rest and maintain adequate hydration
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      <Separator className="my-0" />
      {/* Footer */}
      <div className="flex justify-between items-end px-12 py-10 z-10 relative">
        <div className="bg-white/95 backdrop-blur-sm border-2 border-blue-200 min-w-[220px] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🏥</span>
            </div>
            <div className="text-base text-slate-600 font-medium">Clinic Stamp</div>
          </div>
          <div className="h-20 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-sm bg-slate-50/50">
            Official Stamp
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm border-2 border-blue-200 min-w-[220px] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">✍️</span>
            </div>
            <div className="text-base text-slate-600 font-medium">Doctor's Signature</div>
          </div>
          <div className="h-20 border-b-4 border-blue-500 w-48 mt-4 rounded-sm bg-gradient-to-r from-blue-50 to-transparent"></div>
          <div className="text-sm text-slate-700 mt-3 font-semibold">{data.doctorName || 'Dr. John Smith, MD'}</div>
        </div>
      </div>
      {/* Enhanced bottom border */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '12px',
        background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 25%, #f59e0b 50%, #ef4444 75%, #8b5cf6 100%)',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        zIndex: 1,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      }} />
    </div>
  );
};


