import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const resumePath = path.join(
    process.cwd(),
    'public',
    'documents',
    'resume.pdf',
  );
  const fileBuffer = await fs.promises.readFile(resumePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume.pdf"',
    },
  });
}
