import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Controle de Gastos</h1>
      <p>
        Acesse a página de{' '}
        <Link href="/persons" style={{ color: 'blue', textDecoration: 'underline' }}>
          pessoas
        </Link>
        .
      </p>
      <p>
        Acesse a página de{' '}
        <Link href="/transactions" style={{ color: 'blue', textDecoration: 'underline' }}>
          transações
        </Link>
        .
      </p>
    </div>
  );
}
