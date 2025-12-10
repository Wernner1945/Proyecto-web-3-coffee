import React from "react";
import { useState } from "react"; 
import { obtEmpleado } from "../services/empleadosServices";
import Empleados from "./Empleados";

import './css/obtenerCliente.css'
function ObtenerEmpleado() {

    const [idInput, setIdInput] = useState(''); 
    
    const [empleado, guardarEmpleado] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    
    const [listaEmpleado, setListaEmpleado] = useState(false);

    if (listaEmpleado) {
        return <Empleados/>
    }

    function manejarCambioID(e) {
        setIdInput(e.target.value);
    }
    
    async function handleBuscar(e) {
        e.preventDefault();
        
        const idBusqueda = parseInt(idInput);
        
        if (isNaN(idBusqueda) || idBusqueda <= 0) {
            setError("Por favor, ingresa un ID válido.");
            guardarEmpleado(null);
            return;
        }

        setCargando(true);
        setError(null);
        guardarEmpleado(null); 
        
        try {
            
            const resultado = await obtEmpleado(idBusqueda); 
            console.log(resultado)
            if (resultado) {
                guardarEmpleado(resultado.empleado);
            } else {
                setError(`No se encontró el empleado con ID: ${idBusqueda}`);
            }
        } catch (err) {
            setError("Error al contactar al servidor.");
        } finally {
            setCargando(false);
        }
    }
    
    return (
        <div>
            <h2> Obtener datos de Empleado</h2>
            <form onSubmit={handleBuscar}> {/* Usar un form para la acción de buscar */}
                <label>ID:</label>
                <input 
                className="input" 
                    type="number" 
                    name="id" 
                    value={idInput} // El input está controlado por el estado
                    onChange={manejarCambioID} // Usamos la función de cambio
                />
                <button className="btnBuscar" type="submit" disabled={cargando}>
                    {cargando ? 'Buscando...' : 'Buscar'}
                </button>
                <button className="btnVolver" type="submit" onClick={
                    () => {
                        setListaEmpleado(true)
                    }
                }>
                    Volver
                </button>
                
            </form>

            <hr />

            {cargando && <p>Cargando datos...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {empleado && ( 
                <div className="detalle_container">
                    <div className="detaller">
                        <h3>Datos Encontrados</h3>
                        <p><strong>Nombre:</strong> {empleado.nombre}</p>
                        <p><strong>Apellido:</strong> {empleado.apellido}</p>
                        <p><strong>Cargo:</strong> {empleado.cargo}</p>
                        <p><strong>Edad:</strong> {empleado.edad}</p>
                        <p><strong>Teléfono:</strong> {empleado.telefono}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ObtenerEmpleado