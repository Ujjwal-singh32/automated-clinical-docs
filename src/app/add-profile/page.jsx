"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MediCareNavbar from "@/components/ui/Navbar";
import MediCareFooter from "@/components/ui/Footer";
import { toast } from "react-toastify";

export default function DoctorProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    experience: "",
    pastHospitals: "",
    currentHospital: "",
    contact: "",
  });

  const [signatureFile, setSignatureFile] = useState(null);
  const [stampFile, setStampFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetch("/api/doctor/add-profile");
      const data = await res.json();

      if (data) {
        setFormData({
          name: data.name || "",
          age: data.age || "",
          qualification: data.qualification || "",
          experience: data.experience || "",
          pastHospitals: data.pastHospitals || "",
          currentHospital: data.currentHospital || "",
          contact: data.contact || "",
        });

        if (data.signatureUrl) setSignaturePreview(data.signatureUrl);
        if (data.stampUrl) setStampPreview(data.stampUrl);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "signature") {
        setSignatureFile(file);
        setSignaturePreview(reader.result);
      } else {
        setStampFile(file);
        setStampPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (signatureFile) data.append("signature", signatureFile);
    if (stampFile) data.append("stamp", stampFile);

    try {
      const res = await fetch("/api/doctor/add-profile", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save profile");

      const result = await res.json();
      toast.success("Profile saved successfully!");
      if (result.signatureUrl) setSignaturePreview(result.signatureUrl);
      if (result.stampUrl) setStampPreview(result.stampUrl);

      router.push("/profile");
    } catch (err) {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MediCareNavbar />

      <main className="flex-grow w-full bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-6 flex items-center justify-center relative overflow-auto">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-5xl z-10"
        >
          <div className="rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-2xl p-10">
            <h2 className="text-4xl font-extrabold text-center text-indigo-700 drop-shadow-xl mb-10 tracking-wide">
              🩺 Doctor Profile Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/70 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Phone or Email"
                    className="bg-white/70 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-white/70 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    className="bg-white/70 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="bg-white/70 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentHospital">Current Hospital</Label>
                  <Input
                    id="currentHospital"
                    name="currentHospital"
                    value={formData.currentHospital}
                    onChange={handleChange}
                    className="bg-white/70 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pastHospitals">Past Hospitals</Label>
                <Textarea
                  id="pastHospitals"
                  name="pastHospitals"
                  value={formData.pastHospitals}
                  onChange={handleChange}
                  className="bg-white/70 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="signature">Doctor's Signature</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "signature")}
                  />
                  {signaturePreview && (
                    <img
                      src={signaturePreview}
                      alt="Signature Preview"
                      className="w-40 mt-2 rounded-xl shadow-md border border-indigo-200"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stamp">Official Stamp</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "stamp")}
                  />
                  {stampPreview && (
                    <img
                      src={stampPreview}
                      alt="Stamp Preview"
                      className="w-40 mt-2 rounded-xl shadow-md border border-indigo-200"
                    />
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-6 rounded-xl shadow-xl transition-all duration-300"
              >
                💾 Save Profile
              </Button>
            </form>
          </div>
        </motion.div>
      </main>

      <MediCareFooter />
    </div>
  );
}
