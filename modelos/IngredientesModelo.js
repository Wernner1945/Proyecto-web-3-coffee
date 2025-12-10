import {db} from '../config/db.js'


export const obtener_todo = async() => {
    const [resultado] = await db.query('SELECT * FROM ingredientes');
    return resultado;
}


export const insertar = async (ingrediente) => {
    const {nombre, stock_actual, costo, ubicacion} = ingrediente
    const connection = await db.getConnection();

    try {

        if (nombre.length == 0) {
            return {
                message: "Se necesita llenar el nombre del ingrediente"
            }
        }

        if (stock_actual < 0) {
            return {
                message: "El stock actual no puede ser negativo"
            }
        }

        if (costo <= 0) {
            return {
                message: "El costo debe ser un valor positivo"
            }
        }


        const [resultado] = await db.query(
            'INSERT INTO ingredientes (nombre, stock_actual, costo, ubicacion) VALUES (?, ?, ?, ?)',
            [nombre, stock_actual, costo, ubicacion]
        );
        return {
            id: resultado.insertId,...ingrediente
        };

    } finally {
        connection.release()
    }
}


export const obtener_ingrediente = async(id) => {
    const [ resultado ] = await db.query('SELECT * FROM ingredientes WHERE id_ingrediente = ?', [id])
    return resultado;
}


export const actualizar_ingrediente = async(id, ingrediente) => {

    const {nombre, stock_actual, costo, ubicacion} = ingrediente;
    const connection = await db.getConnection();

    try {
        const [ingredienteExistente] = await connection.query(
            'SELECT id_ingrediente FROM ingredientes WHERE id_ingrediente = ?', [id]
        );
        if (ingredienteExistente.length == 0) {
            return false
        }

        const [resultado] = await db.query(
            'UPDATE ingredientes SET nombre = ?, stock_actual = ?, costo = ?, ubicacion = ? WHERE id_ingrediente = ?',
            [nombre, stock_actual, costo, ubicacion, id]
        );
        return {
            message: "Ingrediente actualizado"
        }
        
    } finally {
        connection.release();
    }
}


export const eliminar_ingrediente = async(id) => {
    const [ingredienteEliminado] = await db.query(
        'DELETE FROM ingredientes WHERE id_ingrediente = ?', [id]
    )
    return ingredienteEliminado
}