import { error } from 'console';
import {obtener_todo, insertar, obtener_cliente, eliminar_cliente, actualizar_cliente} from '../modelos/ClientesModelo.js'


export const obtenerClientes = async (req, res) => {
    try {
        const resultado = await obtener_todo();
        res.status(200).json(resultado);
        
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ msg: 'Error interno al obtener los clientes.' });
    }
};


export const obtenerClienteId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await obtener_cliente(id)

        if (resultado.length == 0) {
            return res.status(404).json(
                {
                    error: "Cliente no encontrado"
                }
            )
        }

        const cliente = resultado[0];
        res.json({cliente})

        
    } catch (error) {
        res.status(500).json(
            {
                error: error.message
            }
        )
    }
}


export const crearCliente = async (req, res) => {
    try {
        const resultado = await insertar(req.body);
        res.json(resultado)
    } catch (error) {
        res.status(500).json({ msg: 'Error interno al registrar el cliente.' });
    }
};


export const actualizarCliente = async (req, res) => {
    try {

        const { id } = req.params;
        const resultado = await actualizar_cliente(id, req.body);

        if (resultado == false) {
            res.json(
                {
                    mensaje: "Cliente inexistente"
                }
            )
        } else {
            res.json(
                {
                    mensaje: "¡ Datos del cliente actualizados !",
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


export const borrarCliente = async (req, res) => {
    try {

        const { id } = req.params;
        const { clienteEliminado } = await eliminar_cliente(id)

        res.json({
            mensaje: "Cliente eliminado exitosamente",
            cliente: clienteEliminado
        })


    } catch (error) {
        res.status(500).json({
            error: error.message,
            mensaje: "Ocurrio un error inesperado en la eliminacion del cliente"
        })
    }
}