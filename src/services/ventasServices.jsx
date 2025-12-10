import axios from "axios";


const API_URL = "/api/ventas";


export const obtVentas = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data
}

export const obtVenta = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
}


export const insertarVenta = async (venta) => {
    const respuesta = await axios.post(API_URL, venta)
    return respuesta.data
}

export const actualizarVenta = async (id, venta) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, venta);
    return respuesta.data;
}

export const eliminarVenta = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
}