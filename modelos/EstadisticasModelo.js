// backend/modelos/estadisticasModelo.js
import {db} from "../config/db.js";

// 1. Unidades vendidas por producto (usando la columna 'producto' directamente)
export const obtenerVentasProductoModelo = async () => {
    const [rows] = await db.query(`
        SELECT producto,
               SUM(cantidad) AS unidades
        FROM ventas
        GROUP BY producto
        ORDER BY unidades DESC
    `);
    return rows;
};

// 2. Total mensual de ventas (usando la columna 'total' de la venta)
export const obtenerVentasMensualesModelo = async () => {
    const [rows] = await db.query(`
        SELECT DATE_FORMAT(fecha, '%Y-%m') AS mes,
               SUM(total) AS total
        FROM ventas
        GROUP BY mes
        ORDER BY mes ASC
    `);
    return rows;
};