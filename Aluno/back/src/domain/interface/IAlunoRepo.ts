import {Aluno} from "../model/Aluno";
export interface IAlunoRepo {
  listar(): Promise<Aluno[]>;
  buscar(matricula: string): Promise<Aluno | null>;
  criar(aluno: Aluno): Promise<Aluno>;
  atualizar(matricula: string, aluno: Aluno): Promise<Aluno>;
  excluir(matricula: string): Promise<void>;
}