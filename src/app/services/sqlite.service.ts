import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
  capSQLiteChanges,
  capSQLiteValues
} from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SqliteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private readonly DB_NAME = 'bdd.cancutV2';
  private readonly DB_VERSION = 1;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  /** Inicializacion de BDD con usuario de prueba para desarrollo */
  public async initialize(): Promise<void> {
    await this.sqlite.checkConnectionsConsistency();
    const { result: isConn } = await this.sqlite.isConnection(this.DB_NAME, false);
    if (isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        false,
        'no-encryption',
        this.DB_VERSION,
        false
      );
    }

    await this.db.open();
    await this.db.execute(`PRAGMA foreign_keys = ON;`);

    // 🟩 Se agregó columna nacionalidad en tabla Usuarios
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS Usuarios(
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        fechaNacimiento TEXT NOT NULL,
        comuna TEXT NOT NULL,
        direccion TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        nacionalidad TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Contacto(
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        tipoSolicitud TEXT NOT NULL,
        mensaje TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Reserva(
        id INTEGER PRIMARY KEY NOT NULL,
        nombreMascota TEXT NOT NULL,
        edadMascota INTEGER NOT NULL CHECK(edadMascota >= 0),
        tamanoMascota TEXT NOT NULL,
        fecha TEXT NOT NULL,
        hora TEXT NOT NULL,
        lugarEncuentro TEXT NOT NULL,
        sucursal TEXT NOT NULL,
        emailUsuario TEXT NOT NULL,
        latitud REAL,
        longitud REAL
      );
    `;
    await this.db.execute(createTablesSQL);

    // 🟩 Se agregó nacionalidad al usuario de prueba
    const seedUserStmt = `
      INSERT OR IGNORE INTO Usuarios
        (nombre, apellido, fechaNacimiento, comuna, direccion, email, password, nacionalidad)
      VALUES (?,?,?,?,?,?,?,?);
    `;
    await this.db.run(seedUserStmt, [
      'Tester',
      'Automatico',
      '1970-01-01',
      'Santiago',
      'Av. Prueba 1313',
      'test@cancut.com',
      'tester123',
      'Chile' // 🟩 nacionalidad por defecto
    ]);
  }

  /** Cerrar conexión */
  public async close(): Promise<void> {
    await this.db.close();
    await this.sqlite.closeConnection(this.DB_NAME, false);
  }

  // MET Users:

  // 🟩 Se agregó nacionalidad al tipo y la query
  public async addUsuario(u: {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    comuna: string;
    direccion: string;
    email: string;
    password: string;
    nacionalidad: string;
  }): Promise<capSQLiteChanges> {
    const stmt = `
      INSERT INTO Usuarios
        (nombre, apellido, fechaNacimiento, comuna, direccion, email, password, nacionalidad)
      VALUES (?,?,?,?,?,?,?,?);
    `;
    const result = await this.db.run(stmt, [
      u.nombre,
      u.apellido,
      u.fechaNacimiento,
      u.comuna,
      u.direccion,
      u.email,
      u.password,
      u.nacionalidad // 🟩 agregado
    ]);

    console.log('♥[SQLite] Usuario registrado y almacenado en la BDD[SQLite]♥');
    return result;
  }

  public async getUsuarios(): Promise<any[]> {
    const res: capSQLiteValues = await this.db.query('SELECT * FROM Usuarios;', []);
    const usuarios = res.values ?? [];
    console.log(`♥[SQLite] Usuarios obtenidos: ${usuarios.length}`);
    return usuarios;
  }

  /** Credenciales de login */
  public async authenticate(email: string, password: string): Promise<boolean> {
    const res: capSQLiteValues = await this.db.query(
      'SELECT id FROM Usuarios WHERE email = ? AND password = ?;',
      [email, password]
    );
    return (res.values ?? []).length > 0;
  }

  /** Obtener datos totales de un usuario */
  public async getUsuario(email: string): Promise<any | null> {
    const res: capSQLiteValues = await this.db.query(
      'SELECT * FROM Usuarios WHERE email = ?;',
      [email]
    );
    return (res.values ?? [null])[0];
  }

  // MET Contacto

  public async addContacto(c: {
    nombre: string;
    email: string;
    tipoSolicitud: string;
    mensaje: string;
  }): Promise<capSQLiteChanges> {
    const stmt = `
      INSERT INTO Contacto
        (nombre, email, tipoSolicitud, mensaje)
      VALUES (?,?,?,?);
    `;

    const result = await this.db.run(stmt, [
      c.nombre,
      c.email,
      c.tipoSolicitud,
      c.mensaje
    ]);

    console.log('♥[SQLite] Solicitud de contacto registrada:♥[SQLite]', c);
    return result;
  }

  public async getContactos(): Promise<any[]> {
    const res: capSQLiteValues = await this.db.query('SELECT * FROM Contacto;', []);
    return res.values ?? [];
  }

  // MET Reserva

  public async addReserva(r: {
    nombreMascota: string;
    edadMascota: number;
    tamanoMascota: string;
    fecha: string;
    hora: string;
    lugarEncuentro: string;
    sucursal: string;
    emailUsuario: string;
    latitud?: number;
    longitud?: number;
  }): Promise<capSQLiteChanges> {
    const stmt = `
      INSERT INTO Reserva
        (nombreMascota, edadMascota, tamanoMascota, fecha, hora, lugarEncuentro, sucursal, emailUsuario, latitud, longitud)
      VALUES (?,?,?,?,?,?,?,?,?,?);
    `;

    const result = await this.db.run(stmt, [
      r.nombreMascota,
      r.edadMascota,
      r.tamanoMascota,
      r.fecha,
      r.hora,
      r.lugarEncuentro,
      r.sucursal,
      r.emailUsuario,
      r.latitud ?? null,
      r.longitud ?? null
    ]);

    console.log('♥[SQLite] Reserva registrada y almacenada en la BDD[SQLite]♥');
    return result;
  }

  public async getReservasPorUsuario(email: string): Promise<any[]> {
    const res: capSQLiteValues = await this.db.query(
      'SELECT * FROM Reserva WHERE emailUsuario = ? ORDER BY id DESC;',
      [email]
    );
    return res.values ?? [];
  }

  public async getReservas(): Promise<any[]> {
    const res: capSQLiteValues = await this.db.query(
      'SELECT * FROM Reserva ORDER BY id DESC;',
      []
    );
    return res.values ?? [];
  }

  // public async deleteDatabase(): Promise<void> {
  //   try {
  //     await (this.sqlite as any).deleteDatabase({ database: this.DB_NAME });
  //     console.log('🗑️ Base de datos eliminada con éxito.');
  //   } catch (error) {
  //     console.error('❌ Error al eliminar la base de datos:', error);
  //   }
  // }
}