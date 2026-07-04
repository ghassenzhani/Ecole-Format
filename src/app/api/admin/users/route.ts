import { NextResponse } from 'next/server';
import { db } from '@/db';
import { students } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allStudents = await db.select({
      id: students.id,
      name: students.name,
      email: students.email,
      createdAt: students.createdAt
    }).from(students).orderBy(desc(students.createdAt));
    
    return NextResponse.json(allStudents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
