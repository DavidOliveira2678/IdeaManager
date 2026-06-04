# 💡 IdeaManager

Aplicação fullstack para gerenciamento pessoal de ideias. Permite cadastrar, listar, editar, favoritar e deletar ideias organizadas por categoria.

## 🛠️ Tecnologias

**Backend**
- .NET 10 / C#
- ASP.NET Core Web API
- Entity Framework Core 9
- MySQL
- BCrypt.Net

**Frontend**
- React 18
- Vite
- React Router DOM
- Axios

## 📋 Pré-requisitos

- [.NET SDK 9+](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- MySQL rodando localmente

## ⚙️ Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd IdeaManager
```

### 2. Configure o banco de dados

Acesse o MySQL e execute:

```sql
CREATE DATABASE ideamanager;
```

Depois edite `backend/appsettings.json` com suas credenciais MySQL:

```json
"ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=ideamanager;user=SEU_USUARIO;password=SUA_SENHA"
}
```

### 3. Rode o backend

```bash
cd backend
dotnet ef database update
dotnet run
```

A API estará disponível em `http://localhost:5047`.

### 4. Rode o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

## 🔗 Endpoints da API

### Usuário
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/usuario/cadastrar` | Cadastra novo usuário |
| POST | `/api/usuario/login` | Realiza login |
| GET | `/api/usuario/{id}` | Busca usuário por ID |

### Ideia
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/ideia/usuario/{usuarioId}` | Cria nova ideia |
| GET | `/api/ideia/usuario/{usuarioId}` | Lista ideias do usuário |
| GET | `/api/ideia/{id}` | Busca ideia por ID |
| PUT | `/api/ideia/{id}` | Atualiza ideia |
| DELETE | `/api/ideia/{id}` | Deleta ideia |

## 🏗️ Arquitetura

```text
backend/
├── Controllers/    # Endpoints HTTP
├── Services/       # Regras de negócio
├── Repositories/   # Acesso ao banco de dados
├── Models/         # Entidades do banco
├── DTOs/           # Objetos de transferência
├── Data/           # DbContext
└── Exceptions/     # Exceções personalizadas e middleware
```

## 📝 Funcionalidades
- Cadastro e login de usuário com senha criptografada (BCrypt)
- CRUD completo de ideias
- Categorias: Jogos, Livros, Receitas, Dia a dia, Outro
- Marcar/desmarcar ideia como favoritada
- Ideias isoladas por usuário logado
- Tratamento global de exceções
