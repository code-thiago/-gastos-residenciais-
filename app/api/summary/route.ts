import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // Busca todas as transações
  const transactions = await prisma.transaction.findMany();

  // Calcula os totais
  const totalReceitas = transactions
    .filter((t) => t.type === 'receita')
    .reduce((sum, t) => sum + t.value, 0);

  const totalDespesas = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((sum, t) => sum + t.value, 0);

  const saldoTotal = totalReceitas - totalDespesas;

  return NextResponse.json({
    saldoTotal,
    totalReceitas,
    totalDespesas,
  });
}