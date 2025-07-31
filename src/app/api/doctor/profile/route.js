import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Doctor from "@/models/doctorModel";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { userId,name } = body;
    
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json({ success: false, message: "Missing required field: name" }, { status: 400 });
    }

    const existingDoctor = await Doctor.findOne({ userId });

    if (existingDoctor) {
      return NextResponse.json({ success: true, doctor: existingDoctor }, { status: 200 });
    }

    const newDoctor = new Doctor({
      userId,
      name,
      age: null,
      qualification: "",
      contact: null,
      experience: null,
      pastHospitals: "",
      currentHospital: "",
      signatureUrl: "",
      stampUrl: "",
    });

    await newDoctor.save();

    return NextResponse.json({ success: true, doctor: newDoctor }, { status: 201 });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
