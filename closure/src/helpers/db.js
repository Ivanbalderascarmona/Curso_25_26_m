
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const nombreArchivo = fileURLToPath(import.meta.url);
const nombreDirectorio = path.dirname(nombreArchivo);

// Crear path a carrito.db
const rutaDB = path.join(nombreDirectorio, '../db/carrito.db');

// Abrir la base de datos
const db = new sqlite3.Database(rutaDB);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL,
        cantidad INTEGER
        )
    `);
});

export default db;