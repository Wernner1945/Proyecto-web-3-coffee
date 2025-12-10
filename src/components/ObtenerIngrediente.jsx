import React from "react";
import { useState } from "react"; 
import { obtIngrediente } from "../services/ingredientesServices";
import Ingredientes from "./Ingredientes"; 

import './css/obtenerCliente.css'
function ObtenerIngrediente() {

    const [idInput, setIdInput] = useState(''); 
    
    const [ingrediente, guardarIngrediente] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    
    const [listaIngrediente, setListaIngrediente] = useState(false);

    if (listaIngrediente) {
        return <Ingredientes/>
    }

    function manejarCambioID(e) {
        setIdInput(e.target.value);
    }
    
    async function handleBuscar(e) {
        e.preventDefault();
        
        const idBusqueda = parseInt(idInput);
        
        if (isNaN(idBusqueda) || idBusqueda <= 0) {
            setError("Por favor, ingresa un ID válido.");
            guardarIngrediente(null);
            return;
        }

        setCargando(true);
        setError(null);
        guardarIngrediente(null); 
        
        try {
            
            const resultado = await obtIngrediente(idBusqueda); 
            console.log(resultado)
            if (resultado && resultado.ingrediente) {
                guardarIngrediente(resultado.ingrediente);
            } else if (resultado && resultado.length > 0) {
                guardarIngrediente(resultado[0]);
            } else {
                setError(`No se encontró el ingrediente con ID: ${idBusqueda}`);
            }
        } catch (err) {
            setError("Error al contactar al servidor.");
        } finally {
            setCargando(false);
        }
    }
    
    return (
        <div>
            <h2> Obtener datos de Ingrediente</h2>
            <form onSubmit={handleBuscar}>
                <label>ID:</label>
                <input 
                    className="input" 
                    type="number" 
                    name="id" 
                    value={idInput}
                    onChange={manejarCambioID}
                />
                <button className="btnBuscar" type="submit" disabled={cargando} onClick={
                    () => {
                        if (idInput == 0) {
                            alert("Ingrese ID correctamente")
                        }
                    }
                }>
                    {cargando ? 'Buscando...' : 'Buscar'}
                </button>
                <button className="btnVolver" type="submit" onClick={
                    () => {
                        setListaIngrediente(true)
                    }
                }>
                    Volver
                </button>
                
            </form>

            <hr />

            {cargando && <p>Cargando datos...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {ingrediente && ( 
                <div className="detalle_container">
                    <div className="detalle">
                        <h3>Datos Encontrados</h3>
                        <p><strong>ID:</strong> {ingrediente.id_ingrediente}</p>
                        <p><strong>Nombre:</strong> {ingrediente.nombre}</p>
                        <p><strong>Stock Actual:</strong> {ingrediente.stock_actual}</p>
                        <p><strong>Costo:</strong> {ingrediente.costo}</p>
                        <p><strong>Ubicación:</strong> {ingrediente.ubicacion}</p>
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default ObtenerIngrediente