<template>
  <div class="container">
    <h1>Escolha sua Ação</h1>
    
    <div class="action-box">
      <div class="form-group">
        <label>Nome:</label>
        <input type="text" v-model="novoAluno.nome" required>
        <label>Turma:</label>
        <input type="text" v-model="novoAluno.turma" required>
        <button @click="cadastrarAluno">Incluir</button>
      </div>
      <div class="form-group">
        <label>Digite a matrícula: </label>
        <input type="text" v-model="matriculaBuscar" required>
        <button @click="buscarAluno">Buscar</button>
        <p v-if="alunoBuscado" class="aluno-info">
          Nome: {{ alunoBuscado.nome }} | Turma: {{ alunoBuscado.turma }} | Matrícula: {{ alunoBuscado.matricula }}
        </p>
      </div>
    </div>

    <div class="lista-alunos">
      <div v-for="aluno in alunos" :key="aluno.matricula" class="aluno-item">
        Aluno: {{ aluno.nome }} - Turma: {{ aluno.turma }} - Matrícula: {{ aluno.matricula }} <button @click="excluirAluno(aluno.matricula)">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Aluno } from '~/types/aluno'

const BASEURL = 'http://localhost:3002'

const alunos = ref<Aluno[]>([])
const alunoBuscado = ref<Aluno | null>(null)
const matriculaBuscar = ref('')
const novoAluno = ref<Aluno>({
  nome: '',
  turma: ''
})

const cadastrarAluno = async () => {
  try {
    const response = await fetch(`${BASEURL}/alunos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAluno.value)
    })

    if (!response.ok) throw new Error('Erro ao cadastrar aluno')
    
    novoAluno.value = { nome: '', turma: '' }
    await listarAlunos()
  } catch (error) {
    console.error('Erro ao cadastrar:', error)
  }
}

const excluirAluno = async (matricula: string| undefined) => {
  if (!matricula) {
    return
  }

  try {
    const response = await fetch(`${BASEURL}/alunos/${matricula}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      await listarAlunos()
    } else {
    }
  } catch (error) {
    console.error('Erro ao excluir:', error)
  }
}

const buscarAluno = async () => {
  try {
    const response = await fetch(`${BASEURL}/alunos/matricula/${matriculaBuscar.value}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
      alunoBuscado.value = null
      alert('Aluno não encontrado')
      return
    }

    alunoBuscado.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar:', error)
    alert('Erro ao buscar aluno')
  }
}

const listarAlunos = async () => {
  try {
    const response = await fetch(`${BASEURL}/alunos`, { method: 'GET' })
    const dados = await response.json()
    
    if (Array.isArray(dados)) {
      alunos.value = dados
    }
  } catch (error) {
    console.error('Erro ao listar alunos:', error)
  }
}

onMounted(() => {
  listarAlunos()
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.action-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.form-group:last-child {
  border-bottom: none;
}

label {
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(135deg, #0056b3, #003580);
  transform: scale(1.05);
}

.aluno-info {
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.lista-alunos {
  margin-top: 20px;
}

.aluno-item {
  padding: 10px;
  background: white;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style> 