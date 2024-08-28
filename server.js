const http = require('http');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data', 'users.json'); 
const docsFilePath = path.join(__dirname, 'data', 'docs.json'); 


const usersData = fs.readFileSync(usersFilePath, 'utf-8');
const docsData = fs.readFileSync(docsFilePath, 'utf-8');

const handleRequest = (request, response) => { 
    switch (request.url) {
        case '/users':
            if (usersData) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(usersData);
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Erro ao carregar os dados de usuários.');
            }
            break;
        case '/docs':
            if (docsData) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(docsData);
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Erro ao carregar dados dos documentos.');
            }
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404 Pagina nao encontrada');
    }
};

const server = http.createServer(handleRequest);

const port = 3300;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});