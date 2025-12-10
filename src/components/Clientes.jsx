import { useState, useEffect } from "react";
import NuevoCliente from "./NuevoCliente.jsx";
import EditarCliente from "./EditarCliente.jsx";
import ObtenerCliente from "./ObtenerCliente.jsx";
import { obtClientes, eliminarCliente } from "../services/clientesServices.jsx";


import './css/app.css'
import './css/normalize.css'

function Clientes() {
    const [clientes, guardarClientes] = useState([]);
    const [id, setID] = useState([])
    const [editar, setEditar] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const [verCliente, setVerCliente] = useState(false);

    

    async function consultar() {
        const resultado = await obtClientes();
        guardarClientes(resultado)
        
    }
    useEffect(
        () => {
            consultar();
        }, []
    );

    async function eliminaCliente(id) {
        const resultado = await eliminarCliente(id);
        consultar();
    }

    if (editar) {
        return <EditarCliente id={id} volver = {
            () => {
                setEditar(false)
                consultar(); // Recargar la lista al volver
            }
        }/>
    }

    

    if (nuevo) {
        return <NuevoCliente volver = {
            () => {
                setNuevo(false)
                consultar(); // Recargar la lista al volver
            }
        }/>
    }

    if (verCliente) {
        return <ObtenerCliente volver = {
            () => {
                setVerCliente(false)
            }
        }/>
    }


    return (
        <>
            <h2>Lista de Clientes</h2>
            <button 
            className="butonCrear" onClick={()=> {setNuevo(true);}}>Nuevo Cliente</button>
            <button
            className="butonObtener" onClick={
                () => {setVerCliente(true)}
            }>Obtener Cliente </button>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.id_cliente}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.correo}</td>
                                <td>
                                    <button className="butonEditar" onClick={()=>{
                                        setEditar(true);
                                        setID(cliente.id_cliente)
                                    }}>Editar</button>
                                    <button 
                                    className="butonEliminar"
                                    onClick={
                                        () => eliminaCliente(cliente.id_cliente)
                                    }>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        
        </>
    )
}

export default Clientes