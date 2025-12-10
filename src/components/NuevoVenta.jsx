import { useState } from "react";
import './css/app.css'
import './css/normalize.css'
import {
    insertarVenta
} from '../services/ventasServices.jsx'

const INITIAL_STATE = {
    producto:"",
    precio: 0,
    fecha: "",
    cantidad: 0,
    nombre_cliente: ""
};

function NuevaVenta() {
    const [venta, guardarVenta] = useState({
        producto:"",
        precio: 0,
        fecha: "",
        cantidad: 0,
        nombre_cliente: ""
    })


    function validacion() {
        if (venta.producto.length == 0) {
                            alert("Llene el campo de nombre de producto")
                        } else if (venta.precio <= 0) {
                            alert("Ingrese precio correctamente")
                        } else if (venta.cantidad <= 0) {
                            alert("Ingrese una cantidad valida")
                        } else if (venta.nombre_cliente.length == 0) {
                            alert("Falta ingresar el nombre del cliente")
                        } else if (venta.fecha == null) {
                            alert("Ingrese fecha correctamente")
                        } else {
                            alert("Nueva venta hecha con exito")
                            guardarVenta(INITIAL_STATE)
                            
                        }
    }

    function leeVenta(e) {
        guardarVenta({
            ...venta,
            [e.target.name]:e.target.value
        })
    }

    async function insertaVenta(e) {
        e.preventDefault();
        if (venta.producto.length === 0) {
        alert("Llene el campo de nombre de producto");
        return;
    } else if (venta.precio <= 0) {
        alert("Ingrese precio correctamente");
        return;
    } else if (venta.cantidad <= 0) {
        alert("Ingrese una cantidad valida");
        return;
    } else if (venta.nombre_cliente.length === 0) {
        alert("Falta ingresar el nombre del cliente");
        return;
    } else if (!venta.fecha) {
        alert("Ingrese fecha correctamente");
        return;
    }
        try {
        const resultado = await insertarVenta(venta);
        alert("Nueva venta hecha con exito");
        guardarVenta(INITIAL_STATE); // limpia el formulario
    } catch (error) {
        alert("Error al guardar la venta: " + error.message);
    }
    }

    return (
        <>
            <h2>Nueva Venta</h2>
            <form onSubmit={insertaVenta}>
                <div>
                    <label>Producto:</label>
                    <input type="text" name="producto" placeholder="Nombre del Producto"
                    onChange={leeVenta}/>
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="number" name="precio" step="0.01" 
                    placeholder="Precio"
                    onChange={leeVenta}/>
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" name="fecha" 
                    placeholder="Fecha de la Venta"
                    onChange={leeVenta}/>
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input type="number" name="cantidad" 
                    placeholder="Cantidad Vendida"
                    onChange={leeVenta}/>
                </div>

                <div>
                    <label>Nombre Cliente:</label>
                    <input type="text" name="nombre_cliente" placeholder="Nombre del Cliente"
                    onChange={leeVenta}/>
                </div>
                <button type="submit" >Guardar</button>
            </form>
        
        </>
    )
}
export default NuevaVenta;