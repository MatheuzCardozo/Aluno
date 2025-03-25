//Funções q ligam a API com o front
import express from "express";
import cors from "cors";
import { listar, inserir, buscar, excluir} from "./controller/AlunoController.js";

const app = express();
app.use(cors());
app.use(express.json()); 

//Rota para listar alunos
app.get("/alunos", async (req, res) => {
    try {
        const alunos = await listar();
        res.json(alunos); 
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar alunos" });
    }
});

//Rota para inserir um novo aluno
app.post("/alunos", async (req, res) => {
    try {
        const aluno = req.body;
       if(aluno!=null){
        await inserir(aluno);
        res.json({ message: "Aluno inserido com sucesso" });
       }else{
        res.status.json({erro:"Erro aluno nulo"});
       }
    } catch (error) {
        res.status(500).json({ error: "Erro ao inserir aluno" });
    }
});

// Rota para buscar um aluno pela matrícula
app.get("/alunos/matricula/:matricula", async (req, res) => {
    try {
        const { matricula } = req.params;
        console.log(`Buscando aluno com matrícula: ${matricula}`);
        const aluno = await buscar(matricula); 
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar aluno" });
    }
});

// Rota para excluir um aluno
app.delete("/alunos/:matricula", async (req, res) => {
    try {
        const { matricula } = req.params;
        await excluir(matricula);
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir aluno!!" });
    }
});

// Iniciar o servidor
let port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log("Servidor no ar..., na porta: "+port); 
});
