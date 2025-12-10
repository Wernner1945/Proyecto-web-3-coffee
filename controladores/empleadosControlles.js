import { error } from 'console';
import {obtener_todo, insertar, obtener_empleado, eliminar_empleado, actualizar_empleado} from '../modelos/EmpleadoModelo.js'


export const obtenerEmpleados = async (req, res) => {
    try {
        // Llama al método getAll del modelo Nombre
        const resultado = await obtener_todo();
        res.status(200).json(resultado);
        
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ msg: 'Error interno al obtener los empleados.' });
    }
};


export const obtenerEmpleadoId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await obtener_empleado(id)

        if (resultado.length == 0) {
            return res.status(404).json(
                {
                    error: "Empleado no encontrado"
                }
            )
        }

        const empleado = resultado[0];
        res.json({empleado})

        
    } catch (error) {
        res.status(500).json(
            {
                error: error.message
            }
        )
    }
}


export const crearEmpleado = async (req, res) => {
    try {
        const resultado = await insertar(req.body);
        res.json(resultado)
    } catch (error) {
        res.status(500).json({ msg: 'Error interno al registrar el empleado.' });
    }
};


export const actualizarEmpleado = async (req, res) => {
    try {

        const { id } = req.params;
        const resultado = await actualizar_empleado(id, req.body);

        if (resultado == false) {
            res.json(
                {
                    mensaje: "Empleado inexistente"
                }
            )
        } else {
            res.json(
                {
                    mensaje: "¡ Datos del empleado actualizados !",
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


export const borrarEmpleado = async (req, res) => {
    try {

        const { id } = req.params;
        const { empleadoEliminado } = await eliminar_empleado(id)

        res.json({
            mensaje: "Empleado eliminado exitosamente",
            empleado: empleadoEliminado
        })


    } catch (error) {
        res.status(500).json({
            error: error.message,
            mensaje: "Ocurrio un error inesperado en la eliminacion del empleado"
        })
    }
}