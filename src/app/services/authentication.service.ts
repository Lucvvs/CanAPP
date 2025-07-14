import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  comuna: string;
  direccion: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly STORAGE_KEY = 'usuarioActivo';
  private usuario$ = new BehaviorSubject<Usuario | null>(this.getActiveUser());

  constructor(private router: Router) {}

  getActiveUser(): Usuario | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) as Usuario : null;
  }

  isAuthenticated(): boolean {
    return this.usuario$.value !== null;
  }

  login(usuario: Usuario): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    this.usuario$.next(usuario); // ✅ Notifica a quien esté escuchando
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.usuario$.next(null);
    this.router.navigate(['']);
  }
}