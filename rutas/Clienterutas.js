import express from 'express';
import { obtenerClientes, obtenerClienteId, crearCliente, actualizarCliente, borrarCliente } from '../controladores/clientesControlles.js';

const rutasCliente = express.Router()

rutasCliente.get('/', obtenerClientes);
rutasCliente.get('/:id', obtenerClienteId);
rutasCliente.post('/', crearCliente);
rutasCliente.put('/:id', actualizarCliente);
rutasCliente.delete('/:id', borrarCliente);

export default rutasCliente;