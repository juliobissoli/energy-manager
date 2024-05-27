# Gerenciamento de Faturas de Energia (API)

Este projeto de gerenciamento de faturas de energia foi desenvolvido utilizando as seguintes tecnologias:

- Node.js
- TypeScript
- Fastfy
- Prisma ORM
- PostgreSQL
- Jest
- Swagger

### Como Rodar o Projeto

Para rodar o projeto, siga os passos abaixo:

1. Clone o repositório do projeto
2. Instale as dependências utilizando o comando 
Havendo dependências, instale na pasta do seu projeto o npm ou yarn:

```bash
npm install
```

3. Configure o arquivo `.env` com as informações do banco de dados PostgreSQL, copie os dados do arquivo `.env.example` e cole no seu arquivo `.env`
4. Suba o container com o banco de dados na sua maquina

```bash
docker compose up -d
```

5. Execute as migrações do banco de dados com o comando 

```bash
 npx prisma migrate dev
 or 
 npx prisma db push --force-reset
```


6. Inicie o servidor local com o comando 
```bash
npm run dev  
or
npm run start
```


### Documentacao
A documentecao das rotas da api e feita atravez do Swagger, com a aplicacao rodado acesso o link
 [localhost:3000/docs](http://localhost:3000/docs)

## Banco de dados
O Prisma traz uma funcionalidade que e uma interface visual que permite visulizar comno esta o banco de dado. Para visualizar-la basta rodar
```base
npx prisma studio
```

### Testes
Essa aplicacao usa a ferramenta Jest para testes o desenvolvimente de teste unitariuos. Para rodar os testes faca
```bash
 npm run test
```



