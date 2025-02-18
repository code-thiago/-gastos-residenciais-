import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    include: { person: true }, // Inclui os dados da pessoa relacionada
  });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const { description, value, type, personId } = await request.json();

  // Verifica se a pessoa existe
  const person = await prisma.person.findUnique({
    where: { id: personId },
  });

  if (!person) {
    return NextResponse.json({ error: 'Pessoa não encontrada' }, { status: 404 });
  }

  // Verifica se a pessoa é menor de idade e o tipo é "receita"
  if (person.age < 18 && type === 'receita') {
    return NextResponse.json(
      { error: 'Menores de idade não podem ter receitas' },
      { status: 400 }
    );
  }

  // Cria a transação
  const transaction = await prisma.transaction.create({
    data: { description, value, type, personId },
    include: { person: true }, // Inclui os dados da pessoa relacionada
  });
  return NextResponse.json(transaction, { status: 201 });
}