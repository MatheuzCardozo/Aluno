class Aluno{
    _id;
    _nome;
    _turma;
    _matricula;
    
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }

    get turma() {
        return this._turma;
    }
    set turma(value) {
        this._turma = value;
    }
    
    get matricula() {
        return this._matricula;
    }
    set matricula(value) {
        this._matricula = value;
    }
    constructor(pId,pNome,pTurma,pMatricula){
        this._id=pId;
        this._nome=pNome;
        this._turma=pTurma;
        this._matricula=pMatricula;
    }
}
export default Aluno;