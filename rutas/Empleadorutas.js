import express from 'express';
import { obtenerEmpleados, obtenerEmpleadoId, crearEmpleado, actualizarEmpleado, borrarEmpleado } from '../controladores/empleadosControlles.js';

const rutas = express.Router()

rutas.get('/', obtenerEmpleados);
rutas.get('/:id', obtenerEmpleadoId);
rutas.post('/', crearEmpleado);
rutas.put('/:id', actualizarEmpleado);
rutas.delete('/:id', borrarEmpleado);

export default rutas;