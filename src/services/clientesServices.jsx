import axios from "axios";

const API_URL = "/api/clientes";


export const obtClientes = async () => {
    // Método GET para obtener todos los clientes
    const respuesta = await axios.get(API_URL);
    return respuesta.data
}

export const obtCliente = async (id) => {
    // Método GET para obtener un cliente específico por su ID
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
}


export const insertarCliente = async (cliente) => {
    const respuesta = await axios.post(API_URL, cliente)
    return respuesta.data
}

export const actualizarCliente = async (id, cliente) => {
    // Método PUT para actualizar los datos
    const respuesta = await axios.put(`${API_URL}/${id}`, cliente);
    return respuesta.data;
}

export const eliminarCliente = async (id) => {
    // Método DELETE para eliminar el registro
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
}