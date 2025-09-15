export class Aluno {
    private _nome: string;
    private _turma: string;
    private _matricula?: string;

    constructor(pNome: string, pTurma: string, pMatricula?: string) {
        this._nome = pNome;
        this._turma = pTurma;
        this._matricula = pMatricula;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error("Nome não pode ser vazio");
        }
        if (value.length > 100) {
            throw new Error("Nome não pode ter mais que 100 caracteres");
        }
        this._nome = value.trim();
    }

    get turma(): string {
        return this._turma;
    }

    set turma(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error("Turma não pode ser vazia");
        }
        if (value.length > 50) {
            throw new Error("Turma não pode ter mais que 50 caracteres");
        }
        this._turma = value.trim();
    }

    get matricula(): string | undefined {
        return this._matricula;
    }

    toJSON() {
        return {
            matricula: this._matricula,
            nome: this._nome,
            turma: this._turma
        };
    }

    static fromJSON(json: any): Aluno {
        return new Aluno(
            json.nome,
            json.turma,
            json.matricula
        );
    }
}
