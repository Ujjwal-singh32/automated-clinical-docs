import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Report from '@/models/reportModel';

export async function GET() {
  try {
    await connectDB();

    const reports = await Report.find({}).sort({ date: -1 }); // Optional: sorted by newest first

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reports', error: error.message },
      { status: 500 }
    );
  }
}
