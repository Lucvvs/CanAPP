const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos simulados
let novedades = [
  {
    id: 1,
    titulo: '¡Nueva sucursal en Providencia!',
    img: 'assets/img/novedad1.png',
    descripcion: 'Ya abrimos en Av. Nueva Providencia #3131!'
  },
  {
    id: 2,
    titulo: 'Promo 2x1',
    img: 'assets/img/novedad2.png',
    descripcion: 'Todos los perritos pequeños tienen 2x1 en corte y baño hasta el 31/06/2025.'
  },
  {
    id: 3,
    titulo: 'Retiro de mascotas GRATIS',
    img: 'assets/img/novedad3.png',
    descripcion: 'Retiro y entrega de mascotas en domicilio sin costo de Lunes a Viernes entre 8:00AM y 13:00PM'
  }
];

// Rutas API
app.get('/novedades', (req, res) => res.json(novedades));

app.post('/novedades', (req, res) => {
  const nueva = { id: Date.now(), ...req.body };
  novedades.push(nueva);
  res.status(201).json(nueva);
});

app.put('/novedades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  novedades = novedades.map(n => n.id === id ? { ...n, ...req.body } : n);
  res.json({ actualizado: true });
});

app.delete('/novedades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  novedades = novedades.filter(n => n.id !== id);
  res.json({ eliminado: true });
});

// 👇 ESTA ES LA PARTE MÁS IMPORTANTE
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 API escuchando en http://0.0.0.0:${port}`);
});