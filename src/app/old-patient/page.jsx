"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { toast } from 'react-toastify';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Search,
  CalendarDays,
  User,
  ClipboardSignature,
  Info,
  XCircle,
} from "lucide-react";
import MediCareNavbar from "@/components/ui/Navbar";
import MediCareFooter from "@/components/ui/Footer";

const OldPatientPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchId, setSearchId] = useState("");
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Fetch data from API
  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/report/show");
      const data = await res.json();

      const transformed = data.reports.map((r) => {
        const fullData = {
          ...r,
          reportId: r.reportId || "N/A",
          attendingPhysician: r.attendingPhysician || "Dr. B. R. Reddy", // fallback
          dateOfVisit: format(new Date(r.date), "dd MMM yyyy"),

          department: r.department || "General",
          medicalLicense: r.medicalLicense || "LIC123456",
          patientName: r.patientName,
          age: r.age,
          gender: r.gender,
          bloodType: r.bloodType || "A+",
          weight: r.weight || "—",
          contactNumber: r.contact || "—",
          symptoms: r.symptoms || [],
          observations: r.observations || [],
          prescription: r.prescription || [],
          remarks: r.remarks || "",
          doctorName: "Dr BR. Reddy ",
          clinicName: "Medicare Health",
          clinicAddress: "Medicare Clinic, NIT Jamshedpur",
          contact: "+91 9876543210",
        };


        return {
          id: r.reportId,
          name: r.patientName,
          date: format(new Date(r.date), "yyyy-MM-dd"),
          symptoms: r.symptoms || "—",
          age: r.age,
          gender: r.gender,
          fullData, // Add fullData to each transformed object
        };
      });

      setAllPatients(transformed);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };


  // Filter patients by selected date
  const filterByDate = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const results = allPatients.filter((p) => p.date === dateStr);
    setFilteredPatients(results);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterByDate(selectedDate);
  }, [allPatients, selectedDate]);

  useEffect(() => {
    const input = searchId.trim().toLowerCase();

    if (input === "") {
      filterByDate(selectedDate); // Restore date-based results
      return;
    }

    const filtered = allPatients.filter((p) =>
      p.id.toLowerCase().includes(input) // smooth partial match
    );

    setFilteredPatients(filtered);

    if (filtered.length > 0) {
      setSelectedDate(new Date(filtered[0].date)); // optional: sync calendar
    }
  }, [searchId]);




  const handleClearSearch = () => {
    setSearchId("");
    filterByDate(selectedDate);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen flex flex-col">
        <MediCareNavbar />
        <main className="flex-grow">
          <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
              {/* Left: Patient List */}
              <div className="lg:col-span-2">
                <div className="mb-8 flex items-center gap-4">
                  <Search className="text-gray-600 w-6 h-6" />
                  <Input
                    placeholder="Search Patient ID (e.g., P001)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full max-w-xl h-14 text-lg rounded-xl px-5 shadow-md focus:ring-4 focus:ring-purple-300"
                  />
                  {searchId && (
                    <button
                      onClick={handleClearSearch}
                      className="flex items-center text-sm text-red-500 hover:text-red-700"
                    >
                      <XCircle className="w-5 h-5 mr-1" /> Clear
                    </button>
                  )}
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  {searchId
                    ? `Showing Result for "${searchId}"`
                    : `Patients on ${format(selectedDate, "MMMM d, yyyy")}`}
                </h2>

                {filteredPatients.length > 0 ? (
                  <div className="space-y-6">
                    {filteredPatients.map((p) => (
                      <Card
                        key={p.id}
                        className="flex items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-8 border-purple-500"
                      >
                        <div className="flex-1 space-y-1">
                          <h3 className="text-xl font-bold text-gray-800">
                            {p.name}
                          </h3>
                          <p className="text-sm text-gray-500">Patient ID: {p.id}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-2/3 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <ClipboardSignature className="w-4 h-4 text-purple-500" />
                            <span>
                              <strong>Symptoms:</strong> {p.symptoms}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-500" />
                            <span>
                              <strong>Age:</strong> {p.age}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-pink-500" />
                            <span>
                              <strong>Gender:</strong> {p.gender}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-green-600" />
                            <span>
                              <strong>Visited:</strong> {p.date}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            localStorage.clear();
                            localStorage.setItem("pdfDataView", JSON.stringify(p.fullData));
                            window.location.href = "/pdf-template";
                          }}
                          className="ml-6 bg-purple-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-purple-700 transition"
                        >
                          Download PDF
                        </button>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic mt-4">No patients found.</p>
                )}
              </div>

              {/* Right: Calendar */}
              <div className="lg:col-span-1  top-24 right-10 bg-white rounded-3xl shadow-xl p-6 border border-purple-300 max-h-[450px] overflow-hidden z-50">
                <h3 className="text-2xl font-bold text-purple-700 flex items-center gap-3 mb-6">
                  <CalendarDays className="w-6 h-6" />
                  Select Date
                </h3>
                <Calendar
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSearchId("");
                  }}
                  locale="en-US"
                  className="rounded-xl border-0 shadow-md scale-105"
                  tileClassName={({ date }) =>
                    format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                      ? "bg-purple-500 text-white rounded-full"
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </main>
        <MediCareFooter />
      </div>
    </>
  );
};

export default OldPatientPage;
