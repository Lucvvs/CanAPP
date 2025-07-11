import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
  capSQLiteChanges,
  capSQLiteValues
} from '@capacitor-community/sqlite';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class SqliteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private readonly DB_NAME = 'bdd.cancutV2';
  private readonly DB_VERSION = 1;
  private isWeb = Capacitor.getPlatform() === 'web';
  private storageReady = false;

  constructor(private storage: Storage) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  public async initialize(): Promise<void> {
    if (this.isWeb) {
      await this.storage.create();
      this.storageReady = true;

      if (!(await this.storage.get('usuarios'))) {
        await this.storage.set('usuarios', [{
          id: 1,
          nombre: 'Tester',
          apellido: 'Automatico',
          fechaNacimiento: '1970-01-01',
          comuna: 'Santiago',
          direccion: 'Av. Prueba 1313',
          email: 'test@cancut.com',
          password: 'tester123',
          nacionalidad: 'Chile'
        }]);
      }
      if (!(await this.storage.get('contactos'))) {
        await this.storage.set('contactos', []);
      }
      if (!(await this.storage.get('reservas'))) {
        await this.storage.set('reservas', []);
      }

      console.log('🌐 Storage listo para entorno web');
      return;
    }

    await this.sqlite.checkConnectionsConsistency();
    const { result: isConn } = await this.sqlite.isConnection(this.DB_NAME, false);
    this.db = isConn
      ? await this.sqlite.retrieveConnection(this.DB_NAME, false)
      : await this.sqlite.createConnection(this.DB_NAME, false, 'no-encryption', this.DB_VERSION, false);

    await this.db.open();
    await this.db.execute(`PRAGMA foreign_keys = ON;`);
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
      'Chile'
    ]);
  }

  public async close(): Promise<void> {
    if (!this.isWeb) {
      await this.db.close();
      await this.sqlite.closeConnection(this.DB_NAME, false);
    }
  }

  // ──────── USUARIOS ────────

  public async addUsuario(u: any): Promise<any> {
    if (this.isWeb) {
      const usuarios = await this.storage.get('usuarios') || [];
      usuarios.push({ ...u, id: Date.now() });
      await this.storage.set('usuarios', usuarios);
      return { changes: 1 };
    }

    const stmt = `
      INSERT INTO Usuarios
        (nombre, apellido, fechaNacimiento, comuna, direccion, email, password, nacionalidad)
      VALUES (?,?,?,?,?,?,?,?);
    `;
    return await this.db.run(stmt, [
      u.nombre,
      u.apellido,
      u.fechaNacimiento,
      u.comuna,
      u.direccion,
      u.email,
      u.password,
      u.nacionalidad
    ]);
  }

  public async getUsuarios(): Promise<any[]> {
    if (this.isWeb) return await this.storage.get('usuarios') || [];
    const res = await this.db.query('SELECT * FROM Usuarios;', []);
    return res.values ?? [];
  }

  public async authenticate(email: string, password: string): Promise<boolean> {
    if (this.isWeb) {
      const usuarios = await this.storage.get('usuarios') || [];
      return usuarios.some((u: any) => u.email === email && u.password === password);
    }

    const res = await this.db.query(
      'SELECT id FROM Usuarios WHERE email = ? AND password = ?;',
      [email, password]
    );
    return (res.values ?? []).length > 0;
  }

  public async getUsuario(email: string): Promise<any | null> {
    if (this.isWeb) {
      const usuarios = await this.storage.get('usuarios') || [];
      return usuarios.find((u: any) => u.email === email) ?? null;
    }

    const res = await this.db.query(
      'SELECT * FROM Usuarios WHERE email = ?;',
      [email]
    );
    return (res.values ?? [null])[0];
  }

  // ──────── CONTACTO ────────

  public async addContacto(c: any): Promise<any> {
    if (this.isWeb) {
      const contactos = await this.storage.get('contactos') || [];
      contactos.push({ ...c, id: Date.now() });
      await this.storage.set('contactos', contactos);
      return { changes: 1 };
    }

    const stmt = `
      INSERT INTO Contacto
        (nombre, email, tipoSolicitud, mensaje)
      VALUES (?,?,?,?);
    `;
    return await this.db.run(stmt, [c.nombre, c.email, c.tipoSolicitud, c.mensaje]);
  }

  public async getContactos(): Promise<any[]> {
    if (this.isWeb) return await this.storage.get('contactos') || [];
    const res = await this.db.query('SELECT * FROM Contacto;', []);
    return res.values ?? [];
  }

  // ──────── RESERVAS ────────

  public async addReserva(r: any): Promise<any> {
    if (this.isWeb) {
      const reservas = await this.storage.get('reservas') || [];
      reservas.push({ ...r, id: Date.now() });
      await this.storage.set('reservas', reservas);
      return { changes: 1 };
    }

    const stmt = `
      INSERT INTO Reserva
        (nombreMascota, edadMascota, tamanoMascota, fecha, hora, lugarEncuentro,
         sucursal, emailUsuario, latitud, longitud)
      VALUES (?,?,?,?,?,?,?,?,?,?);
    `;
    return await this.db.run(stmt, [
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
  }

  public async getReservasPorUsuario(email: string): Promise<any[]> {
    if (this.isWeb) {
      const reservas = await this.storage.get('reservas') || [];
      return reservas.filter((r: any) => r.emailUsuario === email).sort((a: any, b: any) => b.id - a.id);
    }

    const res = await this.db.query(
      'SELECT * FROM Reserva WHERE emailUsuario = ? ORDER BY id DESC;', [email]);
    return res.values ?? [];
  }

  public async getReservas(): Promise<any[]> {
    if (this.isWeb) {
      const reservas = await this.storage.get('reservas') || [];
      return reservas.sort((a: any, b: any) => b.id - a.id);
    }

    const res = await this.db.query('SELECT * FROM Reserva ORDER BY id DESC;', []);
    return res.values ?? [];
  }
}