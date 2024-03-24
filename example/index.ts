import * as express from "express";
import * as path from "path";
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(3005, () => {
    console.log('Servidor rodando em http://localhost:3005');
});
