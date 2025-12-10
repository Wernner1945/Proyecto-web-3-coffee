// backend/models/Nombre.js
import {db} from '../config/db.js'


// metodo obtener todos los empleados
export const obtener_todo = async() => {
    const [resultado] = await db.query('SELECT * FROM empleados');
    return resultado;
}



// metodo insertar nuevo empleado
export const insertar = async (empleado) => {
    const {nombre, apellido, cargo, edad, telefono} = empleado
    const connection = await db.getConnection();

    try {

        if (nombre.length == 0) {
            return {
                message: "Se necesita llenar nombre"
            }
        }

        if (apellido.length == 0) {
            return {
                message: "Se necesita llenar apellido"
            }
        }

        if (cargo.length == 0) {
            return {
                message: "Se necesita llenar cargo"
            }
        }

        if (edad < 0 || edad == 0 ) {
            return {
                message: "Ingrese edad válido"
            }
        }

        if (telefono.length == 0) {
            return {
                message: "Se necesita llenar telefono"
            }
        }


        const [resultado] = await db.query(
            'INSERT INTO empleados (nombre, apellido, cargo, edad, telefono) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, cargo, edad, telefono]
        );
        return {
            id: resultado.insertId,...empleado
        };

    } finally {
        connection.release()
    }
}



// metodo obtener Empleado por id
export const obtener_empleado = async(id) => {
    const [ resultado ] = await db.query('SELECT * FROM empleados WHERE id_empleado = ?', [id])
    return resultado;
}


// metodo actualizar empleado
export const actualizar_empleado = async(id, empleado) => {

    const {nombre, apellido, cargo, edad, telefono} = empleado;
    const  connection = await db.getConnection();

    try {
        const [empleadoExistente] = await connection.query(
            'SELECT id_empleado FROM empleados WHERE id_empleado = ?', [id]
        );
        if (empleadoExistente.length == 0) {
            return false
        }

        const [resultado] = await db.query(
            'UPDATE empleados SET nombre = ?, apellido = ?, cargo = ?, edad = ?, telefono = ?',
            [nombre, apellido, cargo, edad, telefono]
        );
        return {
            message: "Empleado actualizado"
        }
        
    } finally {
        connection.release();
    }
}


// metodo eliminar Empleado
export const eliminar_empleado = async(id) => {
    const [empleadoELiminado] = await db.query(
        'DELETE FROM empleados WHERE id_empleado = ?', [id]
    )
    return empleadoELiminado
}



