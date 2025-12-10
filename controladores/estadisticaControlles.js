import { db } from "../config/db.js";

export const obtenerEstadisticasVentas = async (req, res) => {
    try {
        // Total ingresos
        const [ingresos] = await db.query(`
            SELECT SUM(precio * cantidad) AS total_ingresos FROM ventas
        `);

        // Total ventas
        const [totalVentas] = await db.query(`
            SELECT COUNT(*) AS total_ventas FROM ventas
        `);

        // Producto más vendido
        const [topProducto] = await db.query(`
            SELECT producto, SUM(cantidad) AS total
            FROM ventas
            GROUP BY producto
            ORDER BY total DESC
            LIMIT 1
        `);

        // Ventas por mes
        const [ventasPorMes] = await db.query(`
            SELECT 
                DATE_FORMAT(fecha, "%Y-%m") AS mes,
                SUM(precio * cantidad) AS total
            FROM ventas
            GROUP BY mes
            ORDER BY mes ASC
        `);

        res.json({
            total_ingresos: ingresos[0].total_ingresos || 0,
            total_ventas: totalVentas[0].total_ventas || 0,
            producto_top: topProducto[0] || null,
            ventas_por_mes: ventasPorMes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
