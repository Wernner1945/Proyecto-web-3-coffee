import express from 'express';
import {obtenerVentas, obtenerVentaId, crearVenta, borrarVenta, actualizarVenta } from '../controladores/ventasControlles.js';

const rutasVenta = express.Router()

rutasVenta.get('/', obtenerVentas);
rutasVenta.get('/:id', obtenerVentaId);
rutasVenta.post('/', crearVenta);
rutasVenta.put('/:id', actualizarVenta);
rutasVenta.delete('/:id', borrarVenta);

export default rutasVenta;