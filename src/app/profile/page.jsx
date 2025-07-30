"use client";
//kallu is op very good

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function DoctorProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    experience: "",
    pastHospitals: "",
    currentHospital: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Profile Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl rounded-2xl border-indigo-100">
          <CardContent className="p-10">
            <h2 className="text-4xl font-bold text-indigo-800 mb-8 text-center tracking-wide">
              🩺 Doctor Profile Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-indigo-700 text-sm font-semibold">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Dr. Jane Smith"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-indigo-700 text-sm font-semibold">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="45"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-indigo-700 text-sm font-semibold">Experience (Years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    placeholder="20"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification" className="text-indigo-700 text-sm font-semibold">Qualification / Degree</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  placeholder="MBBS, MD, PhD"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pastHospitals" className="text-indigo-700 text-sm font-semibold">Past Worked Hospitals</Label>
                <Textarea
                  id="pastHospitals"
                  name="pastHospitals"
                  placeholder="E.g., Apollo Hospital, Fortis Hospital..."
                  value={formData.pastHospitals}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentHospital" className="text-indigo-700 text-sm font-semibold">Current Hospital</Label>
                <Input
                  id="currentHospital"
                  name="currentHospital"
                  placeholder="Max Healthcare, Delhi"
                  value={formData.currentHospital}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button type="submit" className="w-full md:w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl">
                  Save Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}