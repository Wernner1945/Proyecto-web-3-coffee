import {db} from '../config/db.js'


export const obtener_todo = async() => {
    const [resultado] = await db.query('SELECT * FROM clientes');
    return resultado;
}


export const insertar = async (cliente) => {
    const {nombre, correo, contraseña} = cliente
    const connection = await db.getConnection();

    try {

        if (nombre.length == 0) {
            return {
                message: "Se necesita llenar nombre"
            }
        }

        if (correo.length == 0) {
            return {
                message: "Se necesita llenar correo"
            }
        }

        if (contraseña.length == 0) {
            return {
                message: "Se necesita llenar contraseña"
            }
        }


        const [resultado] = await db.query(
            'INSERT INTO clientes (nombre, correo, contraseña) VALUES (?, ?, ?)',
            [nombre, correo, contraseña]
        );
        return {
            id: resultado.insertId,...cliente
        };

    } finally {
        connection.release()
    }
}


export const obtener_cliente = async(id) => {
    const [ resultado ] = await db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id])
    return resultado;
}


export const actualizar_cliente = async(id, cliente) => {

    const {nombre, correo, contraseña} = cliente;
    const connection = await db.getConnection();

    try {
        const [clienteExistente] = await connection.query(
            'SELECT id_cliente FROM clientes WHERE id_cliente = ?', [id]
        );
        if (clienteExistente.length == 0) {
            return false
        }

        const [resultado] = await db.query(
            'UPDATE clientes SET nombre = ?, correo = ?, contraseña = ? WHERE id_cliente = ?',
            [nombre, correo, contraseña, id]
        );
        return {
            message: "Cliente actualizado"
        }
        
    } finally {
        connection.release();
    }
}


export const eliminar_cliente = async(id) => {
    const [clienteEliminado] = await db.query(
        'DELETE FROM clientes WHERE id_cliente = ?', [id]
    )
    return clienteEliminado
}