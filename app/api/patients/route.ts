import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Absolute path to patients.json inside /public/mock/
    const filePath = path.join(process.cwd(), 'public', 'mock', 'patients.json');

    // Read and parse JSON
    const fileContents = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);

    // Send JSON response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to load patients data:', error);
    return NextResponse.json({ error: 'Failed to load patients data' }, { status: 500 });
  }
}
