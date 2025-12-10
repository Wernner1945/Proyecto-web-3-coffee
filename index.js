// index.js
import express from 'express'
import rutas from './rutas/Empleadorutas.js'
import rutasCliente from './rutas/Clienterutas.js';
import rutasVenta from './rutas/Ventarutas.js';
import rutasIngrediente from './rutas/Ingredienterutas.js';
import rutasReportes from './rutas/Reporterutas.js';
import routerEstadistica from './rutas/Estadisticarutas.js';
import cors from "cors";

const app = express();

app.use(express.json()); 

app.use('/api/empleados', rutas); 
app.use('/api/clientes',rutasCliente)
app.use('/api/ventas',rutasVenta)
app.use('/api/ingredientes',rutasIngrediente)
app.use('/api/reportes', rutasReportes)
app.use('/api/estadisticas', routerEstadistica)

app.use(cors({
    origin: "http://localhost:5173"
}));



const PORT = 4000;
// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto http://localhost:${PORT}`);
});