# <p align = "center"> Projeto X </p>

<p align="center">
   <img height="100" width="500" src="src/assets/iconReadMe.svg"/>
</p>

<p align = "center">
 
</p>


##  :notebook_with_decorative_cover: Descrição

Esse projeto é um um sistema de compartilhamento de provas entre estudantes!
No RepoProvas qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros :)

***

# Tecnologias
<div display='flex'>
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
<img height="80" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" />
<div>
***

## :rocket: Rotas

```yml
POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "email": "ivan@hotmail.com",
        "password": "Ivan123*",
        "confirmPassowrd": "Ivan123*"
}
```
    
```yml 
POST /signin
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "ivan@hotmail.com",
    "senha": "Ivan123*"
    }
```

```yml 
POST /tests/create (autenticada)
    - Rota para fazer login
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "Parrots Card Game",
        "pdfUrl": "http://parrots.com.br", 
        "categoryId": 1, 
        "teacherDisciplineId": 1
}
```
    
```yml 
GET /tests/disciplines (autenticada)
    - Rota para listar as provas separadas por disciplinas
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests/teachers (autenticada)
    - Rota para listar as provas separadas por professor
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 


***

## 🏁 Rodando a aplicação


Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/CaioVitor1/RepoProvas.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```

---

Made by <a href='https://www.linkedin.com/in/caiovitor33/'> Caio Vitor </a>

