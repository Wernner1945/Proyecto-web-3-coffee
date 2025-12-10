import React from "react";
import { useState } from "react"; 
import { obtVenta } from "../services/ventasServices";
import Ventas from "./Ventas"; 
import './css/obtenerCliente.css'

function ObtenerVenta() {

    const [idInput, setIdInput] = useState(''); 
    
    const [venta, guardarVenta] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    
    const [listaVenta, setListaVenta] = useState(false);

    if (listaVenta) {
        return <Ventas/>
    }

    function manejarCambioID(e) {
        setIdInput(e.target.value);
    }
    
    async function handleBuscar(e) {
        e.preventDefault();
        
        const idBusqueda = parseInt(idInput);
        
        if (isNaN(idBusqueda) || idBusqueda <= 0) {
            setError("Por favor, ingresa un ID válido.");
            guardarVenta(null);
            return;
        }

        setCargando(true);
        setError(null);
        guardarVenta(null); 
        
        try {
            
            const resultado = await obtVenta(idBusqueda); 
            console.log(resultado)
            if (resultado && resultado.venta) {
                guardarVenta(resultado.venta);
            } else if (resultado && resultado.length > 0) {
                guardarVenta(resultado[0]);
            } else {
                setError(`No se encontró la venta con ID: ${idBusqueda}`);
            }
        } catch (err) {
            setError("Error al contactar al servidor.");
        } finally {
            setCargando(false);
        }
    }
    
    return (
        <div>
            <h2> Obtener datos de Venta</h2>
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
                        setListaVenta(true)
                    }
                }>
                    Volver
                </button>
                
            </form>

            <hr />

            {cargando && <p>Cargando datos...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {venta && ( 
                <div className="detalle_container">
                   <div className="detalle">
                     <h3>Datos Encontrados</h3>
                    <p><strong>ID Venta:</strong> {venta.id_venta}</p>
                    <p><strong>Producto:</strong> {venta.producto}</p>
                    <p><strong>Precio:</strong> {venta.precio}</p>
                    <p><strong>Cantidad:</strong> {venta.cantidad}</p>
                    <p><strong>Fecha:</strong> {venta.fecha}</p>
                    <p><strong>Cliente:</strong> {venta.nombre_cliente}</p>
                   </div>
                </div>
            )}
        </div>
    )
}

export default ObtenerVenta