const fs = require('fs');
const path = require('path');
const express = require('express');
const { Router, Request, Resposnse } = require('express')



function getUsers() {
    const usersFilePath = path.join(__dirname, 'data', 'users.json'); 
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(usersData);
}

function getDocs() {
    const docsFilePath = path.join(__dirname, 'data', 'docs.json'); 
    const docsData = fs.readFileSync(docsFilePath, 'utf-8');
    return JSON.parse(docsData);
}

const app = express();

const route  = Router();

app.get('/users', (req, res) => {
    const users = getUsers();
    res.json(users);
});

app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const users = getUsers();
    const user = users.find(u => u.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send({ error: "Usuário não encontrado" });
    }
});

app.get('/docs', (req, res) => {
    const docs = getDocs();
    res.json(docs);
});

app.get('/doc/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const docs = getDocs();
    const doc = docs.find(u => u.id === id);

    if (doc) {
        res.json(doc);
    } else {
        res.status(404).send({ error: "Documento não encontrado" });
    }
});

app.use((req, res) => {
    res.status(404).send({ error: "Rota não encontrada" });
});

const port = 3300;

app.use(route)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});