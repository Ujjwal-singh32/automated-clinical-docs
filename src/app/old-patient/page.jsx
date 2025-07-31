

"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Search,
  CalendarDays,
  User,
  ClipboardSignature,
  Info,
  IdCard,
  XCircle,
} from "lucide-react";

const mockPatients = [
  {
    id: "P001",
    name: "Rajesh Kumar",
    date: "2025-07-30",
    diagnosis: "Diabetes",
    age: 52,
    gender: "Male",
  },
  {
    id: "P002",
    name: "Priya Sharma",
    date: "2025-07-30",
    diagnosis: "Hypertension",
    age: 45,
    gender: "Female",
  },
  {
    id: "P003",
    name: "Amit Verma",
    date: "2025-07-29",
    diagnosis: "Fever",
    age: 30,
    gender: "Male",
  },
];

const OldPatientPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-07-30"));
  const [searchId, setSearchId] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const result = mockPatients.filter((p) => p.date === dateStr);
    setFilteredPatients(result);
  }, [selectedDate]);

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      const found = mockPatients.find(
        (p) => p.id.toLowerCase() === searchId.trim().toLowerCase()
      );
      if (found) {
        setSelectedDate(new Date(found.date));
        setFilteredPatients([found]);
      } else {
        setFilteredPatients([]);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchId("");
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const result = mockPatients.filter((p) => p.date === dateStr);
    setFilteredPatients(result);
  };

  return (
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
              onKeyDown={handleSearchKey}
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
                        <strong>Diagnosis:</strong> {p.diagnosis}
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
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic mt-4">No patients found.</p>
          )}
        </div>

        {/* Right: Calendar */}
        <div className="lg:col-span-1 bg-white rounded-3xl shadow-xl p-6 border border-purple-300">
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
            tileClassName={({ date, view }) =>
              format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ? "bg-purple-500 text-white rounded-full"
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OldPatientPage;

