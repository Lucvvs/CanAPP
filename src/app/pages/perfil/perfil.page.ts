import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss']
})
export class PerfilPage {
  reservas: any[] = [];
  usuario: any = {};

  constructor(private router: Router, private sqliteService: SqliteService) {}

  async ionViewWillEnter() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
    const email = usuarioActivo?.email;

    if (!email) {
      console.warn('No se encontró email en usuarioActivo');
      return;
    }

    try {
      this.usuario = await this.sqliteService.getUsuario(email);
      console.log('Usuario encontrado en BDD:', this.usuario);

      this.reservas = await this.sqliteService.getReservasPorUsuario(email);
      console.log('Reservas cargadas desde BDD:', this.reservas);
    } catch (error) {
      console.error('Error al cargar datos desde la BDD:', error);
    }
  }
}