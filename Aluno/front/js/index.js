//Pagina de Alunos
const btnListar = document.querySelector("#btnListar");
import { BASEURL } from "./const.js";

//Botão referente a listagem dos alunos 
btnListar.onclick = () => {
    alert("Consultando alunos...");
    listarAlunos();
};
//Função para mostrar os alunos
async function listarAlunos() {
    const lblLista = document.querySelector("#lblLista");
    lblLista.innerHTML = "";

    try {
        const response = await fetch(`${BASEURL}/alunos`);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const dados = await response.json();

        if (Array.isArray(dados)) {
            dados.forEach(aluno => {
                const alunoDiv = document.createElement("div");
                alunoDiv.textContent = rowProd(aluno);
                lblLista.appendChild(alunoDiv);
            });
        } else {
            lblLista.innerHTML = "A resposta não contém uma lista de alunos.";
        }
    } catch (error) {
        console.error("Erro ao carregar alunos:", error);
        lblLista.innerHTML = `Erro ao carregar alunos: ${error.message}`;
    }
}

//formatação lista dos alunos
function rowProd(aluno) {
    return `Aluno: ${aluno.nome} - Turma: ${aluno.turma} - Matrícula: ${aluno.matricula}`;
} 
