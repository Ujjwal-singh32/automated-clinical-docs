"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import MediCareNavbar from "@/components/ui/Navbar";
import MediCareFooter from "@/components/ui/Footer";

export default function DoctorProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    contact: "",
    experience: "",
    pastHospitals: "",
    currentHospital: "",
    signatureUrl: "",
    stampUrl: "",
  });

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!user?.id || !user?.fullName) return;

      try {
        const res = await fetch("/api/doctor/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            name: user.fullName,
          }),
        });

        const data = await res.json();

        if (res.ok && data.doctor) {
          setFormData({
            name: data.doctor.name || "",
            age: data.doctor.age || "",
            qualification: data.doctor.qualification || "",
            contact: data.doctor.contact || "",
            experience: data.doctor.experience || "",
            pastHospitals: data.doctor.pastHospitals || "",
            currentHospital: data.doctor.currentHospital || "",
            signatureUrl: data.doctor.signatureUrl || "",
            stampUrl: data.doctor.stampUrl || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchDoctor();
  }, [user?.id, user?.fullName]);

  return (
    <>
      <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen flex flex-col">
        <MediCareNavbar />
        <main className="flex-grow">
          <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-50 flex flex-col items-center px-4 pt-10 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-2xl"
            >
              <Card className="shadow-2xl rounded-2xl border-indigo-100">
                <CardContent className="p-10 relative">
                  <h2 className="text-4xl font-bold text-indigo-800 mb-8 text-center tracking-wide">
                    🧑‍⚕️ Doctor Profile
                  </h2>

                  <div className="space-y-4 text-indigo-900 font-medium">
                    <p><strong>Name:</strong> {formData.name || "—"}</p>
                    <p><strong>Age:</strong> {formData.age || "—"}</p>
                    <p><strong>Qualification:</strong> {formData.qualification || "—"}</p>
                    <p><strong>Contact:</strong> {formData.contact || "—"}</p>
                    <p><strong>Experience:</strong> {formData.experience || "—"} years</p>
                    <p><strong>Past Hospitals:</strong> {formData.pastHospitals || "—"}</p>
                    <p><strong>Current Hospital:</strong> {formData.currentHospital || "—"}</p>
                    {formData.signatureUrl && (
                      <p>
                        <strong>Signature:</strong>{" "}
                        <a href={formData.signatureUrl} target="_blank" className="text-blue-600 underline">View</a>
                      </p>
                    )}
                    {formData.stampUrl && (
                      <p>
                        <strong>Stamp:</strong>{" "}
                        <a href={formData.stampUrl} target="_blank" className="text-blue-600 underline">View</a>
                      </p>
                    )}
                  </div>

                  {/* Pencil button inside Card, bottom-right */}
                  <div className="absolute bottom-4 right-4">
                    <Button
                      className="rounded-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
                      onClick={() => router.push("/add-profile")}
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <MediCareFooter />
      </div>
    </>
  );
}
