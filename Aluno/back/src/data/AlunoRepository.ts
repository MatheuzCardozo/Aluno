//Funções base de ligação com o
import { conexao } from "../config/database";
import { Aluno } from "../domain/model/Aluno";
import { Database } from "sqlite";
import { IAlunoRepo } from "../domain/interface/IAlunoRepo";

export class AlunoRepository implements IAlunoRepo{

    //Função que conecta as outras ao banco e tbm cria o banco se assim for necessario
    private db : Database | null=null;
    private async conectar() {
        if (!this.db) { 
            this.db = await conexao(); 
            await this.db.exec(`
                CREATE TABLE IF NOT EXISTS Aluno (
                    matricula INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    turma TEXT NOT NULL
                );`
            );
        }
        return this.db;
    }

    //Faz a listagem
    public async listar(): Promise<Aluno[]>{
        const db = await this.conectar(); 
        const alunos = await db.all(`SELECT * FROM Aluno`);
        return alunos; 
    }

    //Faz a busca
    public async buscar(matricula:string):Promise<Aluno | null>{
        const db = await this.conectar();
        const aluno = await db.get(`SELECT * FROM Aluno WHERE matricula = ?`, matricula);
        return aluno; 
    }

    //Função que acrescenta objetos ao banco
    public async criar(aluno:Aluno): Promise<Aluno>{
        const db = await this.conectar();
        await db.run(`
            INSERT INTO Aluno (nome, turma) 
            VALUES (?, ?)`, 
            aluno.nome, aluno.turma
        );
        return aluno;
    }

    //Função para editar um aluno
    public async atualizar(matricula: string, aluno: Aluno): Promise<Aluno>{
        const db = await this.conectar();
        
        await db.run(`
            UPDATE Aluno 
            SET nome = ?, turma = ? 
            WHERE matricula = ?`,
            aluno.nome, 
            aluno.turma, 
            matricula
        );
        
        return aluno;
    }

    //Faz a exclusão 
    public async excluir(matricula:string): Promise<void>{
        const db = await this.conectar(); 

        await db.run(`
            DELETE FROM Aluno WHERE matricula = ?`, 
            matricula
        );
        console.log(`Aluno com id ${matricula} excluído com sucesso.`);
    }
}
