import { Component } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  loginError = '';
  loginForm: FormGroup;

  constructor(
  private fb: FormBuilder,
  private sqlite: SqliteService,
  private toastCtrl: ToastController,
  private router: Router,
  private auth: AuthenticationService
) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // 🔁 Test temporal para ver si la navegación funciona
  setTimeout(() => {
    console.log('🧪 Redirección de prueba al constructor...');
    this.router.navigateByUrl('/tabs/inicio');
  }, 3000);
}

  ionViewWillEnter() {
    Keyboard.setScroll({ isDisabled: false });
  }

  async login() {
  if (this.loginForm.invalid) {
    this.loginError = 'Completa todos los campos';
    return;
  }

  const { email, password } = this.loginForm.value;

  try {
    const valid = await this.sqlite.authenticate(email, password);
    if (valid) {
  console.log(`♥ Usuario ${email} encontrado y validado en la BDD`);
  const user = await this.sqlite.getUsuario(email);
  console.log('👤 Usuario obtenido desde la BDD:', user);

  this.auth.login(user); // guarda en localStorage
  console.log('✅ Usuario guardado en localStorage. Intentando redirigir...');

  this.router.navigateByUrl('/inicio');
  console.log('📍 Navegación realizada ');
} else {
      this.loginError = 'Correo o contraseña incorrectos';
      this.loginForm.reset();
    }
  } catch (e) {
    console.error(e);
    const toast = await this.toastCtrl.create({
      message: 'Error al conectar con la base de datos',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
}
  irARegistro() {
    this.router.navigate(['/registro']);
  }

  onFocusScroll(id: string) {
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
}