'use client'; // Indica que este é um componente do lado do cliente

import { useEffect, useState } from 'react';
import styles from './SummaryPage.module.css';

export default function SummaryPage() {
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);

  // Busca os totais ao carregar a página
  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/summary');
      const data = await response.json();
      setSaldoTotal(data.saldoTotal);
      setTotalReceitas(data.totalReceitas);
      setTotalDespesas(data.totalDespesas);
    }
    fetchSummary();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Consulta de Totais</h1>
      <div className={styles.summary}>
        <p>
          <strong>Saldo Total:</strong> R$ {saldoTotal.toFixed(2)}
        </p>
        <p>
          <strong>Total de Receitas:</strong> R$ {totalReceitas.toFixed(2)}
        </p>
        <p>
          <strong>Total de Despesas:</strong> R$ {totalDespesas.toFixed(2)}
        </p>
      </div>
    </div>
  );
}