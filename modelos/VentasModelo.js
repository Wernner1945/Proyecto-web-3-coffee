import {db} from '../config/db.js'


export const obtener_todo = async() => {
    const [resultado] = await db.query('SELECT * FROM ventas');
    return resultado;
}


export const insertar = async (venta) => {
    const {producto, precio, fecha, cantidad, nombre_cliente} = venta
    const connection = await db.getConnection();

    try {

        if (producto.length == 0) {
            return {
                message: "Se necesita llenar producto"
            }
        }

        if (precio <= 0) {
            return {
                message: "Se necesita un precio válido"
            }
        }

        if (fecha.length == 0) {
            return {
                message: "Se necesita llenar fecha"
            }
        }

        if (cantidad <= 0) {
            return {
                message: "Se necesita una cantidad válida"
            }
        }


        const [resultado] = await db.query(
            'INSERT INTO ventas (producto, precio, fecha, cantidad, nombre_cliente) VALUES (?, ?, ?, ?, ?)',
            [producto, precio, fecha, cantidad, nombre_cliente]
        );
        return {
            id: resultado.insertId,...venta
        };

    } finally {
        connection.release()
    }
}


export const obtener_venta = async(id) => {
    const [ resultado ] = await db.query('SELECT * FROM ventas WHERE id_venta = ?', [id])
    return resultado;
}


export const actualizar_venta = async(id, venta) => {

    const {producto, precio, fecha, cantidad, nombre_cliente} = venta;
    const connection = await db.getConnection();

    try {
        const [ventaExistente] = await connection.query(
            'SELECT id_venta FROM ventas WHERE id_venta = ?', [id]
        );
        if (ventaExistente.length == 0) {
            return false
        }

        const [resultado] = await db.query(
            'UPDATE ventas SET producto = ?, precio = ?, fecha = ?, cantidad = ?, nombre_cliente = ? WHERE id_venta = ?',
            [producto, precio, fecha, cantidad, nombre_cliente, id]
        );
        return {
            message: "Venta actualizada"
        }
        
    } finally {
        connection.release();
    }
}


export const eliminar_venta = async(id) => {
    const [ventaEliminada] = await db.query(
        'DELETE FROM ventas WHERE id_venta = ?', [id]
    )
    return ventaEliminada
}