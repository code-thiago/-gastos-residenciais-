import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const persons = await prisma.person.findMany();
  return NextResponse.json(persons);
}

export async function POST(request: Request) {
  const { name, age } = await request.json();
  const person = await prisma.person.create({
    data: { name, age },
  });
  return NextResponse.json(person, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
  }
  await prisma.person.delete({
    where: { id: Number(id) },
  });
  return new NextResponse(null, { status: 204 });
}