import axios from "axios";


const API_URL = "/api/empleados";


export const obtEmpleados = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data
}

export const obtEmpleado = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
}


export const insertarEmpleado = async (empleado) => {
    const respuesta = await axios.post(API_URL, empleado)
    return respuesta.data
}

export const actualizarEmpleado = async (id, empleado) => {
    const respuesta = await axios.put(`${API_URL}/${id}`, empleado);
    return respuesta.data;
}

export const eliminarEmpleado = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
}