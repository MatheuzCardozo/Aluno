//Funções q ligam a API com o front
import express from "express";
import cors from "cors";
import { AlunoRepository } from "../data/AlunoRepository";
import { AlunoService } from "../domain/services/AlunoService";

const alunoRepository = new AlunoRepository();
const alunoService = new AlunoService(alunoRepository);
const app = express();

app.use(cors());
app.use(express.json()); 

//Rota para listar alunos
app.get("/alunos", async (req, res) => {
    try {
        const alunos = await alunoService.listar();
        res.json(alunos); 
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar alunos" });
    }
});

//Rota para inserir um novo aluno
app.post("/alunos", async (req, res) => {
    const aluno = req.body;
    try {
        const alunoAtual = await alunoService.criar(aluno);
        res.json({ message: "Aluno inserido com sucesso", aluno: alunoAtual });
    } catch (error) {
        res.status(500).json({ error: "Erro ao inserir aluno" });
    }
});

//Rota para editar um aluno
app.put("/alunos/:matricula", async (req, res) => {
    try {
        const { matricula } = req.params;
        const alunoData = req.body;
        const alunoAtualizado = await alunoService.atualizar(matricula, alunoData);
        res.json({ 
            message: "Aluno atualizado com sucesso",
            aluno: alunoAtualizado
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar aluno" });
    }
});

// Rota para buscar um aluno pela matrícula
app.get("/alunos/matricula/:matricula", async (req, res) => {
    try {
        const { matricula } = req.params;
        const aluno = await alunoService.buscar(matricula); 
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
        await alunoService.excluir(matricula);
        res.json({ message: "Aluno excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir aluno" });
    }
});

// Iniciar o servidor
let port = process.env.PORT || 3002;
app.listen(port, function(){
    console.log("Servidor no ar..., na porta: "+port); 
}); 