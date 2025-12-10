import { error } from 'console';
import {obtener_todo, insertar, obtener_venta, eliminar_venta, actualizar_venta} from '../modelos/VentasModelo.js'


export const obtenerVentas = async (req, res) => {
    try {
        const resultado = await obtener_todo();
        res.status(200).json(resultado);
        
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ msg: 'Error interno al obtener las ventas.' });
    }
};


export const obtenerVentaId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await obtener_venta(id)

        if (resultado.length == 0) {
            return res.status(404).json(
                {
                    error: "Venta no encontrada"
                }
            )
        }

        const venta = resultado[0];
        res.json({venta})

        
    } catch (error) {
        res.status(500).json(
            {
                error: error.message
            }
        )
    }
}


export const crearVenta = async (req, res) => {
    try {
        const resultado = await insertar(req.body);
        res.json(resultado)
    } catch (error) {
        res.status(500).json({ msg: 'Error interno al registrar la venta.' });
    }
};


export const actualizarVenta = async (req, res) => {
    try {

        const { id } = req.params;
        const resultado = await actualizar_venta(id, req.body);

        if (resultado == false) {
            res.json(
                {
                    mensaje: "Venta inexistente"
                }
            )
        } else {
            res.json(
                {
                    mensaje: "¡ Datos de la venta actualizados !",
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


export const borrarVenta = async (req, res) => {
    try {

        const { id } = req.params;
        const ventaEliminada = await eliminar_venta(id)

        res.json({
            mensaje: "Venta eliminada exitosamente",
            venta: ventaEliminada
        })


    } catch (error) {
        res.status(500).json({
            error: error.message,
            mensaje: "Ocurrio un error inesperado en la eliminacion de la venta"
        })
    }
}