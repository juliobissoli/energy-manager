<h1 align="center"> Energy Manager</h1>

[comment]: <juliobissoli> (Adicione o seu usuário e o nome do repositório)

<p align="center">
  <image
 src="https://img.shields.io/github/languages/count/juliobissoli/energy-manager"  />
  <image
  src="https://img.shields.io/github/languages/top/juliobissoli/energy-manager"
  />
  <image
  src="https://img.shields.io/github/last-commit/juliobissoli/energy-manager"
  />

</p>

## Descrição
Este projeto foi desenvolvido como desafio técnico para o cargo de desenvolvedor full-stack na empresa Lumi. O desafio consistia em montar uma aplicação web que lesse uma série de PDFs, extraísse os principais dados e os salvasse em um banco de dados, tornando-os acessíveis por meio de uma API e os mostrando através de um sistema web em forma de gráficos e estatísticas. Faz uma descrição um pouco mais prolixa. Para isso, eu dividi o projeto em duas partes: API e Front.

## Tecnologias utilizadas
Para o desenvolvimento deste projeto foi necessária a utilização de várias tecnologias.
### Front
- Tailwind CSS
- React
- Shadcn/ui
- TypeScript
- Lucide Icons
- React Router

### API
- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Jest
- Swagger


# Como rodar o projeto

Antes de rodar o projeto na sua máquina você deve ter algumas ferramentas instaladas:


### Ambiente
1. Node (na versão >= v20)
Para instalar o Node.js, você pode utilizar o NVM (Node Version Manager). Para isso, siga as instruções em [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).


2. Docker e docker compose
Para instalar o Docker e o Docker Compose, você pode seguir as instruções em [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)


## Como rodar o projeto
Como o projeto e dividido em doi vamos primeiro rodar o front

### Rodar o front
1. Navegue ate a pasta energi-dashboard-front
```bash
    cd energy-dashboard-front

```

2. Instale as dependencias
```bash
npm install
```


3. Rode o projeto em mode dev
```bash
npm run dev
```

### Rodar a API

1. Navegue ate a pasta energi-dashboard-front
```bash
    cd energy-dashboard-api

```
1. Instale as dependências utilizando o comando 

```bash
npm install
```

2. Configure o arquivo `.env` com as informações do banco de dados PostgreSQL, copie os dados do arquivo `.env.example` e cole no seu arquivo `.env`
4. Suba o container com o banco de dados na sua maquina

```bash
docker compose up -d
```

3. Execute as migrações do banco de dados com o comando 

```bash
 npx prisma migrate dev
 or 
 npx prisma db push --force-reset
```


4. Inicie o servidor local com o comando 
```bash
npm run dev  
or
npm run start
```

### Rodar o  script para ler os dados dos PDF's
Para carregar os dados dos arquivos PDF's que estao salvos na pasta `energy-dashboard-api/invoices`
1. Navegue ate a pasta energi-dashboard-api
```bash
cd energy-dashboard-api

```
2. Rode o camando
```bash
npm run load:invoices
```

Esse comando roda um script que esta em `energy-dashboard-api/script/invoice-reader.js`



# Preview
Abaixo tem algumas capturas de telas de como a apicacao esta funcionando, incluisive com vairiacao de temas (dark/light node) e resposividade
## Front
![Tela de Login - Tema Claro](/energy-dashboard-front/public/descktop-dark.png)
![Tela de Login - Tema Claro](/energy-dashboard-front/public/descktop-light.png)
![Tela de Login - Tema Claro](/energy-dashboard-front/public/mobile-dark.png)
![Tela de Login - Tema Claro](/energy-dashboard-front/public/mobile-light.png)

## API
Na api e possivel ter acesso a interface visual com a documentacao mais tambem visualizar como esta o banco de dados atravez do Prisma Studio
![Tela de Login - Tema Claro](/energy-dashboard-front/public/swagger.png)
![Tela de Login - Tema Claro](/energy-dashboard-front/public/prisma-studio.png)

# Autoria <a name="id05"></a>

[comment]: <> (Adicione seu nome e função)

<h3 align='center'> Saiba mais sobre mim e meus projetos   <a href="https://juliobissoli.vercel.app/">no meu site</a> </h3>
<h4 align='center'> @juliobissoli • desenvolvedor full-stack </h4>


#

[comment]: <> (Adicione as suas redes sociais e profissionais)

<div  align='center'>

[![Linkedin](https://img.shields.io/badge/LinkedIn-0D1117?style=for-the-badge&logo=linkedin&logoColor=blue)](https://www.linkedin.com/in/julio-bissoli/)
<a href = "mailto:juliobissoli33@gmail.com">
![Gmail](https://img.shields.io/badge/Gmail-0D1117?style=for-the-badge&logo=gmail&logoColor=red)</a>
[![github](https://img.shields.io/badge/Github-0D1117?style=for-the-badge&logo=github&logoColor=fff)](https://github.com/juliobissoli)
</div>