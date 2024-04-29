API REST com Autenticação de Usuário e CRUD de Despesas
Este é um projeto de API REST construído com Node.js, Express e MongoDB. A API oferece autenticação de usuário usando tokens JWT e operações CRUD (Create, Read, Update, Delete) para gerenciar despesas.

Funcionalidades
Autenticação de usuário com registro e login.
Operações CRUD para despesas: criar, listar, atualizar e excluir despesas.
Proteção de rotas com autenticação de token JWT.
Pré-requisitos
Node.js e npm instalados na máquina.
MongoDB instalado e em execução.
Instalação
Clone este repositório:
bash
Copy code
git clone https://github.com/luissmonteiro/expenses-crud.git
Instale as dependências:
bash
Copy code
cd seu_repositorio
npm install
Configure o banco de dados MongoDB no arquivo db.js.
Uso
Inicie o servidor:
sql
Copy code
npm start
Use um aplicativo cliente de API REST (por exemplo, Postman) para fazer requisições para as rotas da API.
Rotas
/auth/signup: Rota para registrar um novo usuário.
/auth/login: Rota para autenticar um usuário e receber um token JWT.
/api/expenses: Rotas CRUD para gerenciar despesas.
Estrutura do Projeto
models/: Contém os modelos de dados (usuário e despesa).
controllers/: Contém a lógica de negócios (controladores).
routes/: Define as rotas da API.
db.js: Configuração da conexão com o banco de dados MongoDB.
server.js: Arquivo principal que inicia o servidor.
Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Licença
Este projeto está licenciado sob a Licença MIT.

