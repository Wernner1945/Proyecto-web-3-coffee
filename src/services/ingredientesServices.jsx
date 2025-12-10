import axios from "axios";


const API_URL = "/api/ingredientes";


export const obtIngredientes = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data
}

export const obtIngrediente = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
}


export const insertarIngrediente = async (ingrediente) => {
    const respuesta = await axios.post(API_URL, ingrediente)
    return respuesta.data
}

export const actualizarIngrediente = async (id, ingrediente) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, ingrediente);
    return respuesta.data;
}

export const eliminarIngrediente = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
}