# Sistema de Controle de Gastos Residenciais

Este projeto foi desenvolvido em **TypeScript** com **Prisma** e tem como objetivo implementar um sistema de controle de gastos residenciais. O sistema permite o cadastro de pessoas e transações, além de fornecer uma consulta de totais de receitas e despesas.

## Estrutura do Projeto

O projeto foi organizado da seguinte forma:
├── .next
├── app/
│ ├── persons/ # Lógica relacionada ao cadastro de pessoas
│ ├── transactions/ # Lógica relacionada ao cadastro de transações
│ ├── summary/ # Lógica para consulta de totais
│ └── api/ # Rotas da API
│ ├── persons/ # Rotas relacionadas ao cadastro de pessoas
│ ├── transactions/ # Rotas relacionadas ao cadastro de transações
│ └── summary/ # Rotas para consulta de totais
├── prisma/ # Configurações e migrações do Prisma
├── .env # Variáveis de ambiente
├── README.md # Este arquivo
└── package.json # Dependências e scripts do projeto

### Detalhes da Estrutura

- **`app/persons/`**: Contém a lógica de negócio para o cadastro de pessoas, incluindo criação, listagem e exclusão.
- **`app/transactions/`**: Contém a lógica de negócio para o cadastro de transações, incluindo criação e listagem.
- **`app/summary/`**: Contém a lógica para calcular e exibir os totais de receitas, despesas e saldos.
- **`app/api/`**: Contém as rotas da API, organizadas em subpastas para cada funcionalidade (`persons`, `transactions`, `summary`).
  - Cada subpasta dentro de `api/` possui um arquivo `Route.ts` que define as rotas específicas para aquela funcionalidade.

## Funcionalidades Implementadas

### 1. Cadastro de Pessoas

- **Criação**: Adiciona uma nova pessoa ao sistema.
- **Deleção**: Remove uma pessoa e todas as suas transações associadas.
- **Listagem**: Exibe todas as pessoas cadastradas.

Cada pessoa possui os seguintes atributos:
- **Identificador**: Número inteiro sequencial único gerado automaticamente.
- **Nome**: Texto.
- **Idade**: Número inteiro.

### 2. Cadastro de Transações

- **Criação**: Adiciona uma nova transação ao sistema.
- **Listagem**: Exibe todas as transações cadastradas.

Cada transação possui os seguintes atributos:
- **Identificador**: Número inteiro sequencial único gerado automaticamente.
- **Descrição**: Texto.
- **Valor**: Número decimal positivo.
- **Tipo**: Despesa ou receita.
- **Pessoa**: Identificador da pessoa associada à transação.

**Observação**: Caso a pessoa associada à transação seja menor de idade (menor de 18 anos), apenas despesas serão aceitas.

### 3. Consulta de Totais

- **Listagem de Pessoas**: Exibe o total de receitas, despesas e o saldo (receita - despesa) de cada pessoa.
- **Total Geral**: Exibe o total geral de todas as pessoas, incluindo o total de receitas, total de despesas e o saldo líquido.

## Como o Projeto Foi Desenvolvido

- **TypeScript**: Utilizado para garantir tipagem estática e melhorar a manutenibilidade do código.
- **Prisma**: Utilizado como ORM para gerenciar o banco de dados e simplificar operações de CRUD.
- **Arquitetura Modular**: O projeto foi organizado em módulos separados para pessoas, transações e totais, seguindo uma estrutura limpa e escalável.
- **Rotas Organizadas**: As rotas da API foram separadas em arquivos específicos (`Route.ts`) para cada funcionalidade, facilitando a manutenção e expansão do sistema.
