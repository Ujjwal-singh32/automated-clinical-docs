import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // your DB connector
import Report from '@/models/reportModel'

export async function POST(req) {
  try {
    await connectDB(); 

    const body = await req.json();
    const {
      reportId,
      attendingPhysician,
      department,
      medicalLicense,
      patientName,
      age,
      gender,
      bloodType,
      weight,
      contact,
      symptoms,
      observations,
      prescription,
      remarks
    } = body;

    // Check if report already exists
    const existing = await Report.findOne({ reportId });
    if (existing) {
      return NextResponse.json(
        { message: 'Report with this ID already exists' },
        { status: 409 }
      );
    }

    const newReport = new Report({
      reportId,
      attendingPhysician,
      department,
      medicalLicense,
      patientName,
      age,
      gender,
      bloodType,
      weight,
      contact,
      symptoms,
      observations,
      prescription,
      remarks
    });

    await newReport.save();

    return NextResponse.json(
      { message: 'Report uploaded successfully', report: newReport },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json(
      { message: 'Failed to upload report', error: error.message },
      { status: 500 }
    );
  }
}
