import React from "react";
import { useState, useEffect } from "react";
import { obtVenta, actualizarVenta } from "../services/ventasServices";

import './css/app.css'
import './css/normalize.css'

function EditarVenta({id}) {

    const [venta, guardarVenta] = useState({
        producto: '',
        precio: 0,
        fecha: '',
        cantidad: 0,
        nombre_cliente: ''
    })

    function leeVenta(e) {
        guardarVenta({
            ...venta,
            [e.target.name]:e.target.value
        })
    };

    async function actualizaVenta(e) {
        e.preventDefault();
        const resultado = await actualizarVenta(id, venta)
    };

    async function consultarVenta() {
        const resultado = await obtVenta(id);
        guardarVenta(resultado.venta || resultado)    
    }

    useEffect(
        () => {
            consultarVenta();
        }, [id]
    );

    return (
        <>
            <h2>Editar Venta</h2>
            <form onSubmit={actualizaVenta}>
                <div>
                    <label>Producto:</label>
                    <input type="text" name="producto" placeholder="Nombre del Producto"
                    value={venta.producto || ''}
                    onChange={leeVenta}/>
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="number" name="precio" step="0.01"
                    value={venta.precio || 0}
                    onChange={leeVenta}/>
                </div>
                <div>
                    <label>Fecha:</label>
                    {/* Nota: Para el tipo 'date' en HTML, el valor debe estar en formato 'YYYY-MM-DD' */}
                    <input type="date" name="fecha" 
                    value={venta.fecha ? venta.fecha.split('T')[0] : ''} 
                    onChange={leeVenta}/>
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input type="number" name="cantidad" 
                    value={venta.cantidad || 0}
                    onChange={leeVenta}/>
                </div>
                <div>
                    <label>Nombre Cliente:</label>
                    <input type="text" name="nombre_cliente" placeholder="Nombre del Cliente"
                    value={venta.nombre_cliente || ''}
                    onChange={leeVenta}/>
                </div>
                <button type="submit" onClick={
                    () => {
                        if (venta.producto.length == 0) {
                            alert("Nuevo nombre invalida")
                        } else if (venta.precio <= 0) {
                            alert("Nuevo precio invalida")
                        } else if (venta.cantidad <= 0) {
                            alert("Nuevo cantidad invalida")
                        } else if (venta.nombre_cliente.length == 0) {
                            alert("Nuevo nombre del cliente invalida")
                        } else if (venta.fecha == null) {
                            alert("Ingrese fecha correctamente")
                        } else {
                            alert("Venta editada hecha con exito")
                            
                        }
                    }
                }>Guardar</button>
            </form>
        </>
    )
}

export default EditarVenta