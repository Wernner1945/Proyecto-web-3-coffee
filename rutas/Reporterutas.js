
import express from 'express';
import { generarReporteDeVentas } from '../controladores/reportesControlles.js';

const rutasReportes = express.Router();

rutasReportes.get('/ventas/pdf', generarReporteDeVentas);

export default rutasReportes;
