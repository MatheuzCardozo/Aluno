//Página Principal
const btnListar = document.querySelector("#btnListar");
const btnIncluir = document.querySelector("#btnIncluir");
const btnExcluir = document.querySelector("#btnExcluir");
const btnBuscar = document.querySelector("#btnBuscar");
import { BASEURL } from "./const.js";

//Botões
btnIncluir.onclick = () =>{
    alert("Salvando...");
    cadastrarAluno();
}
btnExcluir.onclick = () => {
    alert("Excluindo...");
    excluirAluno();
};
btnBuscar.onclick = () =>{
    alert("Buscando...");
    buscarAluno();
}

//Funções da página principal
async function buscarAluno() {
    const inpBuscar = document.querySelector("#inpBuscar").value.trim();;
    const lblAluno = document.querySelector("#lblAluno");
    const matricula = inpBuscar;

    try {
        const response = await fetch(`${BASEURL}/alunos/matricula/${matricula}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            lblAluno.textContent = "Aluno não encontrado. Digite uma matricula valida!";
            return;
        }
        
        const aluno = await response.json();
        lblAluno.textContent = `Nome: ${aluno.nome} | Turma: ${aluno.turma} | Matrícula: ${aluno.matricula}`;
    } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        lblAluno.textContent = "Erro ao buscar aluno. Verifique a conexão.";
    }
}

async function cadastrarAluno() {
    const nome = document.querySelector("#inpNome").value.trim();
    const turma = document.querySelector("#inpTurma").value.trim();
    const matricula = document.querySelector("#inpMatricula").value.trim();
    if (!nome || !turma || !matricula) { 
        alert("Preencha todos os campos!");
        return;
    }
    const aluno = { nome, turma, matricula };

    try {
        const response = await fetch(`${BASEURL}/alunos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Limpa os campos após o cadastro
        document.querySelector("#inpNome").value = "";
        document.querySelector("#inpTurma").value = "";
        document.querySelector("#inpMatricula").value = "";
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        mensagem.innerHTML = `Erro ao cadastrar aluno: ${error.message}`;
    }
}

async function excluirAluno() {
    const inpExcluir = document.querySelector("#inpExcluir");
    const idAluno = inpExcluir.value.trim();

    if (!idAluno) {
        alert("Informe um Matricula válida!");
        return;
    }

    try {
        const response = await fetch(`${BASEURL}/alunos/${idAluno}`,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            alert("Aluno excluído com sucesso!");
        } else {
            alert("Erro ao excluir aluno. Verifique se a Matricula está correto.");
        }
    } catch (error) {
        console.error("Erro ao excluir aluno:", error);
    }
}