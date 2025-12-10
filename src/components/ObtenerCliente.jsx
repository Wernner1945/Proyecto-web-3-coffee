import React from "react";
import { useState } from "react"; 
import { obtCliente } from "../services/clientesServices";
import Clientes from "./Clientes"; 

import './css/obtenerCliente.css'
function ObtenerCliente() {

    const [idInput, setIdInput] = useState(''); 
    
    const [cliente, guardarCliente] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    
    const [listaCliente, setListaCliente] = useState(false);

    if (listaCliente) {
        return <Clientes/>
    }

    function manejarCambioID(e) {
        setIdInput(e.target.value);
    }
    
    async function handleBuscar(e) {
        e.preventDefault();
        
        const idBusqueda = parseInt(idInput);
        
        if (isNaN(idBusqueda) || idBusqueda <= 0) {
            setError("Por favor, ingresa un ID válido.");
            guardarCliente(null);
            return;
        }

        setCargando(true);
        setError(null);
        guardarCliente(null); 
        
        try {
            
            const resultado = await obtCliente(idBusqueda); 
            console.log(resultado)
            if (resultado && resultado.cliente) {
                guardarCliente(resultado.cliente);
            } else if (resultado && resultado.length > 0) {
                guardarCliente(resultado[0]);
            } else {
                setError(`No se encontró el cliente con ID: ${idBusqueda}`);
            }
        } catch (err) {
            setError("Error al contactar al servidor.");
        } finally {
            setCargando(false);
        }
    }
    
    return (
        <div>
            <h2> Obtener datos de Cliente</h2>
            <form onSubmit={handleBuscar}>
                <label>ID:</label>
                <input 
                className="input" 
                    type="number" 
                    name="id" 
                    value={idInput}
                    onChange={manejarCambioID}
                />
                <button className="btnBuscar" type="submit" disabled={cargando}>
                    {cargando ? 'Buscando...' : 'Buscar'}
                </button>
                <button className="btnVolver" type="submit" onClick={
                    () => {
                        setListaCliente(true)
                    }
                }>
                    Volver
                </button>
                
            </form>

            <hr />

            {cargando && <p>Cargando datos...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {cliente && ( 
                <div className="detalle_container">
                    <div className="detalle">
                        <h3>Datos Encontrados</h3>
                        <p><strong>ID:</strong> {cliente.id_cliente}</p>
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <p><strong>Correo:</strong> {cliente.correo}</p>
                        <p><strong>Contraseña:</strong> [oculta]</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ObtenerCliente