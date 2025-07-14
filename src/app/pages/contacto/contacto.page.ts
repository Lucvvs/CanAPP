import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss']
})
export class ContactoPage implements OnInit {
  contactoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sqlite: SqliteService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.contactoForm = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern(/^.{5,30}$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      tipoSolicitud: ['', Validators.required],
      mensaje: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(200)]
      ]
    });
  }

  async enviar() {
    if (this.contactoForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos correctamente.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const datos = this.contactoForm.value;
    try {
      await this.sqlite.addContacto({
        nombre: datos.nombre,
        email: datos.email,
        tipoSolicitud: datos.tipoSolicitud,
        mensaje: datos.mensaje
      });

      console.log('♥ Contacto almacenado en la BDD:', datos.nombre);

      const toast = await this.toastCtrl.create({
        message: '¡Gracias por escribirnos! 📬',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.contactoForm.reset();
      this.router.navigate(['/inicio']);
    } catch (e) {
      console.error('Error al guardar contacto en BDD', e);
      const toast = await this.toastCtrl.create({
        message: 'Error al enviar mensaje ❌',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  cancelar() {
    this.contactoForm.reset();
  }
}