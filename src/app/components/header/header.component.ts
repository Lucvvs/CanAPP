import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {}

  volverAtras() {
    const currentUrl = this.router.url;
    if (currentUrl === '/tabs/inicio') {
      this.auth.logout(); 
    } else {
      window.history.back();
    }
  }

  irAContacto() {
    this.router.navigate(['/contacto']);
  }
}