import express from "express";
import { obtenerEstadisticasVentas } from "../controladores/estadisticaControlles.js";

const routerEstadistica = express.Router();

routerEstadistica.get("/", obtenerEstadisticasVentas);

export default routerEstadistica;
