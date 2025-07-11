import { Injectable } from '@angular/core';
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

  constructor(private router: Router) {}

  getActiveUser(): Usuario | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) as Usuario : null;
  }

  isAuthenticated(): boolean {
    return this.getActiveUser() !== null;
  }

  login(usuario: Usuario): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    this.router.navigate(['/tabs/inicio'], { replaceUrl: true });
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate([''], { replaceUrl: true });
  }
}