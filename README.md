# Financial Dashboard

Sistema completo de gerenciamento de dashboards financeiros para controle de receitas, despesas e investimentos.

## 🚀 Funcionalidades

- ✅ Autenticação com email/senha e Google OAuth
- ✅ Criação e gerenciamento de múltiplos dashboards financeiros
- ✅ Controle de entradas (salários, rendimentos) e saídas (despesas)
- ✅ Histórico mensal com filtros por período
- ✅ Relatórios e gráficos de acompanhamento
- ✅ Visualização específica de investimentos
- ✅ Categorização customizável de receitas e despesas
- 🔄 Dicas financeiras com IA (em desenvolvimento)

## 🛠️ Tecnologias

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Router DOM** - Roteamento
- **Zustand** - Gerenciamento de estado
- **Firebase** - Autenticação e banco de dados
- **React Hook Form** + **Zod** - Formulários e validação
- **Recharts** - Gráficos e visualizações
- **date-fns** - Manipulação de datas

### Qualidade de Código

- **ESLint** - Linting
- **Prettier** - Formatação
- **Husky** - Git hooks
- **Commitlint** - Conventional commits
- **Lint-staged** - Validação pré-commit

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm
- Conta no Firebase

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/pablodepine/financial-dashboard.git
cd financial-dashboard
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

Copie o arquivo `.env.example` para `.env` e preencha com suas credenciais do Firebase:

```bash
cp .env.example .env
```

Para obter as credenciais do Firebase:

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **Configurações do projeto** > **Suas apps** > **SDK do Firebase**
4. Copie as credenciais para o arquivo `.env`

5. Habilite a autenticação no Firebase:

- No Firebase Console, vá em **Authentication** > **Sign-in method**
- Habilite **Email/Password** e **Google**

5. Crie um banco de dados Firestore:

- No Firebase Console, vá em **Firestore Database**
- Clique em **Criar banco de dados**
- Escolha o modo de produção e configure as regras de segurança

## 🚀 Executando o projeto

### Modo de desenvolvimento

```bash
pnpm dev
```

O app estará disponível em `http://localhost:5173`

### Build de produção

```bash
pnpm build
```

### Preview da build

```bash
pnpm preview
```

## 📝 Scripts disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria build de produção
- `pnpm preview` - Visualiza a build de produção
- `pnpm lint` - Executa o linter
- `pnpm lint:fix` - Corrige problemas de linting automaticamente
- `pnpm format` - Formata o código com Prettier

## 🏗️ Estrutura do Projeto

```
src/
├── config/              # Configurações (Firebase, etc)
├── features/            # Funcionalidades por domínio
│   ├── auth/           # Autenticação
│   ├── dashboards/     # Dashboards
│   ├── appointments/   # Lançamentos financeiros
│   ├── reports/        # Relatórios
│   ├── investments/    # Investimentos
│   └── settings/       # Configurações
├── shared/             # Código compartilhado
│   ├── components/     # Componentes reutilizáveis
│   ├── hooks/          # Custom hooks
│   ├── services/       # Serviços (API, Firebase)
│   └── utils/          # Utilitários
├── stores/             # Stores Zustand
├── types/              # Tipos TypeScript
└── router/             # Configuração de rotas
```

## 📊 Modelagem de Dados

### Enums

**Tipos de Receita:**

- Salário
- Caju
- Outros

**Tipos de Despesa:**

- Mercado
- Lazer
- Apartamento
- Pessoal
- Taxas/Tarifas
- Investimento
- Olavo
- Farmácia

**Métodos de Pagamento:**

- Dinheiro
- Débito
- Crédito
- PIX
- Transferência
- Boleto

## 🔒 Regras de Segurança do Firestore

Configure as seguintes regras no Firestore para proteger seus dados:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dashboards/{dashboardId} {
      allow read, write: if request.auth != null &&
                           request.auth.uid == resource.data.userId;
    }

    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças usando conventional commits (`git commit -m 'feat: add some feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrão de Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas de manutenção

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

**Pablo Depine**

- GitHub: [@pablodepine](https://github.com/pablodepine)

---

Desenvolvido com ❤️ para melhorar o gerenciamento financeiro pessoal
