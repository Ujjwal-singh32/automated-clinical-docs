import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Doctor from "@/models/doctorModel";

export async function POST(req) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Missing userId" }, { status: 400 });
    }

    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, doctor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
