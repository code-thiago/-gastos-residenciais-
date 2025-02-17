'use client'; // Indica que este é um componente do lado do cliente

import { useEffect, useState } from 'react';
import styles from './PersonsPage.module.css';

interface Person {
  id: number;
  name: string;
  age: number;
}

export default function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // Busca as pessoas ao carregar a página
  useEffect(() => {
    async function fetchPersons() {
      const response = await fetch('/api/persons');
      const data = await response.json();
      setPersons(data);
    }
    fetchPersons();
  }, []);

  // Função para deletar uma pessoa
  async function handleDelete(id: number) {
    const response = await fetch(`/api/persons/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Atualiza a lista de pessoas após deletar
      setPersons(persons.filter((person) => person.id !== id));
    }
  }

  // Função para cadastrar uma nova pessoa
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('/api/persons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: Number(age) }),
    });
    if (response.ok) {
      const newPerson = await response.json();
      setPersons([...persons, newPerson]); // Atualiza a lista
      setName('');
      setAge('');
    }
  }

  return (
    <div className={styles.container}>
      <h1>Lista de Pessoas</h1>
      <ul className={styles.list}>
        {persons.map((person) => (
          <li key={person.id}>
            <div>
              <strong>ID: {person.id}</strong> {/* Exibe o ID */}
              <p>Nome: {person.name}</p>
              <p>Idade: {person.age}</p>
            </div>
            <button onClick={() => handleDelete(person.id)}>Deletar</button>
          </li>
        ))}
      </ul>

      <h2>Cadastrar Nova Pessoa</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}