import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage implements OnInit {

  sucursales = [
    {
      nombre: 'Providencia',
      direccion: 'Av. Nueva Providencia 3131',
      mapsUrl: 'https://www.google.com/maps?q=Av.+Nueva+Providencia+3131'
    },
    {
      nombre: 'Ñuñoa',
      direccion: 'Irarrázaval 916',
      mapsUrl: 'https://www.google.com/maps?q=Irarrázaval+916'
    },
    {
      nombre: 'Maipú',
      direccion: 'Pajaritos 4481',
      mapsUrl: 'https://www.google.com/maps?q=Pajaritos+4481'
    }
  ];

  razas = ['Pequeña', 'Mediana', 'Grande'];
  razaSeleccionada: 'Pequeña' | 'Mediana' | 'Grande' = 'Pequeña';

  servicios = [
    {
      nombre: 'Baño y Cepillado',
      imagen: 'assets/img/banio.png',
      precios: {
        Pequeña: 10000,
        Mediana: 15000,
        Grande: 20000
      }
    },
    {
      nombre: 'Corte completo',
      imagen: 'assets/img/corte.png',
      precios: {
        Pequeña: 15000,
        Mediana: 17000,
        Grande: 19000
      }
    },
    {
      nombre: 'Baño antipulgas',
      imagen: 'assets/img/antipulgas.png',
      precios: {
        Pequeña: 8000,
        Mediana: 14000,
        Grande: 17000
      }
    }
  ];

  novedades = [
    {
      titulo: '¡Nueva sucursal en Providencia!',
      img: 'assets/img/novedad1.png',
      descripcion: 'Ya abrimos en Av. Nueva Providencia #3131!'
    },
    {
      titulo: 'Promo 2x1',
      img: 'assets/img/novedad2.png',
      descripcion: 'Todos los perritos pequeños tienen 2x1 en corte y baño hasta el 31/06/2025.'
    },
    {
      titulo: 'Retiro de mascotas GRATIS',
      img: 'assets/img/novedad3.png',
      descripcion: 'Retiro y entrega de mascotas en domicilio sin costo de Lunes a Viernes entre 8:00AM y 13:00PM'
    }
  ];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 4000,
    },
    loop: true
  };

  constructor(private router: Router, private api: ApiService) {}

  async ngOnInit() {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('✅ Geolocalización activa:', position.coords.latitude, position.coords.longitude);
    } catch (error) {
      console.error('❌ Falló la geolocalización:', error);
    }
  }

  ionViewWillEnter() {
    this.api.getNovedades().subscribe({
      next: (res) => {
        console.log('📰 Novedades actualizadas desde la API:', res);
        this.novedades = [...this.novedades, ...res];
      },
      error: (err) => {
        console.error('❌❌ Error al actualizar novedades desde la API:', JSON.stringify(err, null, 2));
      }
    });
  }
}