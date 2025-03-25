//Funções base de ligação com o
import { conexao } from "../database.js";

//função que conecta as outras ao banco e tbm cria o banco se assim for necessario
let db;
async function conectar() {
    if (!db) { 
        db = await conexao(); 
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Aluno (
                matricula INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                turma TEXT NOT NULL
            );`
        );
    }
    return db;
}

// Função que acrescenta objetos ao banco
async function inserir(aluno) {
    const db = await conectar();

    await db.run(`
        INSERT INTO Aluno (nome, turma, matricula) 
        VALUES (?, ?, ?)`, 
        aluno.nome, aluno.turma, aluno.matricula
    );

}

// Faz a listagem do objeto
async function listar() {
    const db = await conectar(); 

    const alunos = await db.all(`SELECT * FROM Aluno`);
    return alunos; 
}
//Faz a exclusão 
async function excluir(matricula) {
    const db = await conectar(); 

    await db.run(`
        DELETE FROM Aluno WHERE matricula = ?`, 
        matricula
    );
    console.log(`Aluno com id ${matricula} excluído com sucesso.`);
}
//Faz a busca
async function buscar(matricula) {
    const db = await conectar();
    const aluno = await db.get(`SELECT * FROM Aluno WHERE matricula = ?`, matricula);
    return aluno; 
}

export { listar, inserir,buscar, excluir };