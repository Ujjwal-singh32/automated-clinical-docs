import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import connectDB from '@/lib/connectDB'; // Make sure this connects to Mongo
import Doctor from '@/models/Doctor';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(req) {
  await connectDB();
  const { userId } = getAuth(req);
  const doctor = await Doctor.findOne({ userId });
  return NextResponse.json(doctor || {}, { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { userId } = getAuth(req);

  const formData = await req.formData();
  const fields = Object.fromEntries(formData.entries());

  const signatureFile = formData.get("signatureFile");
  const stampFile = formData.get("stampFile");

  const saveFile = async (file, folder) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${folder}-${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  };

  const doctor = await Doctor.findOneAndUpdate(
    { userId },
    {
      ...fields,
      userId,
      ...(signatureFile && signatureFile.name ? { signatureUrl: await saveFile(signatureFile, "sig") } : {}),
      ...(stampFile && stampFile.name ? { stampUrl: await saveFile(stampFile, "stamp") } : {}),
    },
    { new: true, upsert: true }
  );

  return NextResponse.json(doctor, { status: 200 });
}
