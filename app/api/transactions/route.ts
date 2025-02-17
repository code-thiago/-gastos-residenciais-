import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    include: { person: true },
  });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const { description, value, type, personId } = await request.json();

  // Verifica se a pessoa é menor de idade
  const person = await prisma.person.findUnique({
    where: { id: personId },
  });

  if (!person) {
    return NextResponse.json({ error: 'Pessoa não encontrada' }, { status: 404 });
  }

  if (person.age < 18 && type === 'receita') {
    return NextResponse.json(
      { error: 'Menores de idade não podem ter receitas' },
      { status: 400 }
    );
  }

  const transaction = await prisma.transaction.create({
    data: { description, value, type, personId }, // O ID é gerado automaticamente
  });
  return NextResponse.json(transaction, { status: 201 });
}