import axios from "axios";

const API_URL = "http://localhost:4000/api/estadisticas";

export const obtenerEstadisticas = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};
