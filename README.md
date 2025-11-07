# React Movie Database (Projeto Full-Stack)

Este é um aplicativo de lista de filmes construído com React e Node.js, atendendo a um desafio de vaga de emprego. A aplicação permite aos usuários pesquisar filmes, salvar uma lista de favoritos persistente e compartilhar essa lista com outras pessoas através de um link único.

**Link do Deploy (Vercel):** `[COLE SEU LINK DO DEPLOY DO FRONT-END NA VERCEL AQUI]`

---

## 🚀 Funcionalidades Principais

- **Busca Segura (Back-end):** A busca de filmes é feita através de um back-end Node.js, que gerencia as chamadas à API do TMDB e esconde a chave de API secreta.
- **Favoritos Persistentes:** Os usuários podem adicionar ou remover filmes de uma lista de "Favoritos". Essa lista é salva em um banco de dados PostgreSQL (hospedado no Supabase).
- **Identidade Anônima:** Cada usuário recebe um `userId` anônimo único (via `localStorage`) para que o banco de dados possa gerenciar múltiplas listas de favoritos.
- **Gerenciamento de Lista:** Uma visualização dedicada de "Meus Favoritos" que busca e exibe os filmes salvos pelo usuário.
- **Polimento de UI:** O aplicativo remove itens da UI instantaneamente ao desfavoritar (sincronização de estado local) e exibe feedback visual para estados de "Carregamento", "Erro" e "Vazio" (tanto na busca quanto na lista de favoritos).
- **Compartilhamento de Link:** Na tela "Meus Favoritos", o usuário pode gerar um link único (`/share/:userId`) que permite a qualquer pessoa visualizar sua lista (em modo "somente leitura").
- **Design Responsivo:** A aplicação se adapta a layouts de desktop e mobile.

---

## 💻 Pilha de Tecnologias (Tech Stack)

Este projeto é um "monorepo" contendo dois aplicativos separados:

- **Front-End (`movie-list-app`):**

  - **React** (com Hooks e Componentes Funcionais)
  - **Vite** (Build tool)
  - **React Router DOM** (Para as rotas `/` e `/share/:userId`)
  - **Axios** (Para chamadas HTTP ao back-end)
  - **Sass / SCSS** (Para estilização)
  - **React Icons**

- **Back-End (`movie-list-backend-ts`):**

  - **Node.js** (Ambiente de execução)
  - **TypeScript** (Para tipagem estática e código robusto)
  - **Express** (Para criar o servidor e as rotas da API)
  - **Prisma** (ORM para comunicação segura com o banco de dados)
  - **`ts-node-dev`** (Para live-reload do servidor TypeScript)

- **Banco de Dados e Infraestrutura:**
  - **PostgreSQL** (Hospedado gratuitamente no **Supabase**)
  - **Vercel** (Para deploy contínuo tanto do Front-end quanto do Back-end)

---

## 🛠️ Configuração e Execução Local

Para configurar e executar este projeto localmente, você precisará clonar o repositório e configurar **ambos** os aplicativos (Front-End e Back-End).

### Pré-requisitos

- Node.js (v18 ou superior)
- `npm` (ou `yarn`)
- Uma conta no [Supabase](https://supabase.com) (para o banco de dados PostgreSQL)
- Uma chave de API do [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

---

### Parte 1: Configuração do Back-End (Node.js + Prisma + Supabase)

O back-end é o cérebro. Ele precisa ser configurado primeiro.

#### 1.1. Instalar Dependências

```bash
cd movie-list-backend-ts
npm install
```
