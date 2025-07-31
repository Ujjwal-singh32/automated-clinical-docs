
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db.js';
import Doctor from '@/models/doctorModel.js';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET(req) {
  await connectDB();
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const doctor = await Doctor.findOne({ userId });
  return NextResponse.json(doctor || {}, { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const fields = Object.fromEntries(formData.entries());

  const signatureFile = formData.get("signature");
  const stampFile = formData.get("stamp");

  const uploadDir = path.join(process.cwd(), "public/uploads");
  await mkdir(uploadDir, { recursive: true });

  const saveFile = async (file, prefix) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${prefix}-${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  };

  const updateData = {
    ...fields,
    userId,
  };

  if (signatureFile && typeof signatureFile !== "string" && signatureFile.name) {
    updateData.signatureUrl = await saveFile(signatureFile, "sig");
  }

  if (stampFile && typeof stampFile !== "string" && stampFile.name) {
    updateData.stampUrl = await saveFile(stampFile, "stamp");
  }

  const doctor = await Doctor.findOneAndUpdate(
    { userId },
    updateData,
    { new: true, upsert: true }
  );

  return NextResponse.json(doctor, { status: 200 });
}
