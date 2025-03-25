//A conexão com o banco 
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db; 
export async function conexao() {
    if (!db) {
        db = await open({
            filename: './banco.db', 
            driver: sqlite3.Database 
        });
    }
    return db;
}
