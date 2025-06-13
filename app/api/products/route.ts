// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'mock', 'products.json');
    const fileContents = await readFile(filePath, 'utf8');
    const products = JSON.parse(fileContents);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
