const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

const port = 3300;

const readFile = (file) => {
  try {
    const filePath = path.join(__dirname, "data", file);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(
      `Ocorreu um erro ao ler o dados do arquivo ${file}: ${error.message}`
    );
    return null;
  }
};

const users = readFile("users.json");
const docs = readFile("docs.json");

app.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ error: "Erro ao carregar dados dos usuários" });
  }
});

app.get("/api/user/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).send("Erro ao carregar dados do usuário");
  }
});

app.get("/api/docs", (req, res) => {
  try {
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).send({ error: "Erro ao carregar dados dos documentos" });
  }
});

app.get("/api/doc/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const doc = docs.find((u) => u.id === id);

    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).send({ error: "Documento não encontrado" });
    }
  } catch (error) {
    res.status(500).send("Erro ao carregar dados do documento");
  }
});

app.use((req, res) => {
  res.status(404).send({ error: "Rota não encontrada" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
