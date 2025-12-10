import { error } from 'console';
import {obtener_todo, insertar, obtener_ingrediente, eliminar_ingrediente, actualizar_ingrediente} from '../modelos/IngredientesModelo.js'


export const obtenerIngredientes = async (req, res) => {
    try {
        const resultado = await obtener_todo();
        res.status(200).json(resultado);
        
    } catch (error) {
        console.error("Error al obtener ingredientes:", error);
        res.status(500).json({ msg: 'Error interno al obtener los ingredientes.' });
    }
};


export const obtenerIngredienteId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await obtener_ingrediente(id)

        if (resultado.length == 0) {
            return res.status(404).json(
                {
                    error: "Ingrediente no encontrado"
                }
            )
        }

        const ingrediente = resultado[0];
        res.json({ingrediente})

        
    } catch (error) {
        res.status(500).json(
            {
                error: error.message
            }
        )
    }
}


export const crearIngrediente = async (req, res) => {
    try {
        const resultado = await insertar(req.body);
        res.json(resultado)
    } catch (error) {
        res.status(500).json({ msg: 'Error interno al registrar el ingrediente.' });
    }
};


export const actualizarIngrediente = async (req, res) => {
    try {

        const { id } = req.params;
        const resultado = await actualizar_ingrediente(id, req.body);

        if (resultado == false) {
            res.json(
                {
                    mensaje: "Ingrediente inexistente"
                }
            )
        } else {
            res.json(
                {
                    mensaje: "¡ Datos del ingrediente actualizados !",
                    resultado: resultado
                }
            )
        }

    } catch (error) {
        res.status(500).json(
            {
                error: error.message,
                mensaje: "Ocurrio un error inesperado en la actualizacion"
            }
        )
    }
}


export const borrarIngrediente = async (req, res) => {
    try {

        const { id } = req.params;
        const ingredienteEliminado = await eliminar_ingrediente(id)

        res.json({
            mensaje: "Ingrediente eliminado exitosamente",
            ingrediente: ingredienteEliminado
        })


    } catch (error) {
        res.status(500).json({
            error: error.message,
            mensaje: "Ocurrio un error inesperado en la eliminacion del ingrediente"
        })
    }
}