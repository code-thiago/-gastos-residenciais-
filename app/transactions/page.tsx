'use client'; // Indica que este é um componente do lado do cliente

import { useEffect, useState } from 'react';
import styles from './TransactionsPage.module.css';

interface Transaction {
  id: number;
  description: string;
  value: number;
  type: string;
  personId: number;
  person: {
    id: number;
    name: string;
    age: number;
  };
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('despesa');
  const [personId, setPersonId] = useState('');

  // Busca as transações ao carregar a página
  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    }
    fetchTransactions();
  }, []);

  // Função para cadastrar uma nova transação
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description,
        value: parseFloat(value),
        type,
        personId: parseInt(personId),
      }),
    });
    if (response.ok) {
      const newTransaction = await response.json();
      setTransactions([...transactions, newTransaction]); // Atualiza a lista
      setDescription('');
      setValue('');
      setType('despesa');
      setPersonId('');
    } else {
      const error = await response.json();
      alert(error.error); // Exibe mensagem de erro
    }
  }

  return (
    <div className={styles.container}>
      <h1>Lista de Transações</h1>
      <ul className={styles.list}>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <div>
              <strong>{transaction.description}</strong>
              <p>Valor: R$ {transaction.value.toFixed(2)}</p>
              <p>Tipo: {transaction.type}</p>
              <p>
                Pessoa: {transaction.person?.name || 'N/A'} (Idade:{' '}
                {transaction.person?.age || 'N/A'})
              </p>
            </div>
          </li>
        ))}
      </ul>

      <h2>Cadastrar Nova Transação</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <input
          type="number"
          placeholder="ID da Pessoa"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}