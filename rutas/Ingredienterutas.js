import express from 'express';
import {
    obtenerIngredientes, 
    obtenerIngredienteId, 
    crearIngrediente, 
    borrarIngrediente, 
    actualizarIngrediente
} from '../controladores/ingredientesControlles.js';

const rutasIngrediente = express.Router()

rutasIngrediente.get('/', obtenerIngredientes);
rutasIngrediente.get('/:id', obtenerIngredienteId);
rutasIngrediente.post('/', crearIngrediente);
rutasIngrediente.put('/:id', actualizarIngrediente);
rutasIngrediente.delete('/:id', borrarIngrediente);

export default rutasIngrediente;