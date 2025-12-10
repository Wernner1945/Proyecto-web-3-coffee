import { useState, useEffect } from "react";
import NuevaVenta from "./NuevoVenta.jsx";
import EditarVenta from "./EditarVenta.jsx";
import ObtenerVenta from "./ObtenerVenta.jsx";
import { obtVentas, eliminarVenta } from "../services/ventasServices.jsx";
import { descargarReporteVentas } from "../services/reportesServices.jsx";

import './css/app.css'
import './css/normalize.css'

function Ventas() {
    const [ventas, guardarVentas] = useState([]);
    const [id, setID] = useState([])
    const [editar, setEditar] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const [verVenta, setVerVenta] = useState(false);

    

    async function consultar() {
        const resultado = await obtVentas();
        guardarVentas(resultado)
        
    }
    useEffect(
        () => {
            consultar();
        }, []
    );

    async function eliminaVenta(id) {
        const resultado = await eliminarVenta(id);
        consultar();
    }

    if (editar) {
        return <EditarVenta id={id} volver = {
            () => {
                setEditar(false)
                consultar();
            }
        }/>
    }

    

    if (nuevo) {
        return <NuevaVenta volver = {
            () => {
                setNuevo(false)
                consultar();
            }
        }/>
    }

    if (verVenta) {
        return <ObtenerVenta volver = {
            () => {
                setVerVenta(false)
            }
        }/>
    }

    const handleDescargarReporte = async () => {
    const resultadopdf = await descargarReporteVentas();
    if (resultadopdf.success) {
    } else {
        alert("Fallo al generar el reporte: " + resultadopdf.error);
    }
};



    return (
        <>
            <h2>Lista de Ventas</h2>
            <div className="butonsContainer">

            
            <button 
            className="butonCrear" onClick={()=> {setNuevo(true);}}>Nueva Venta</button>
            <button
            className="butonObtener" onClick={
                () => {setVerVenta(true)}
            }>Obtener Venta </button>

                        
            <button class="animated-button"  onClick={() => {handleDescargarReporte()}}>
                <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                </svg>
                <span class="text">Descargar Reporte PDF</span>
                <span class="circle"></span>
                <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                </svg>
            </button>
            </div>


{/* 
            <button className="butonpdf" onClick={() => {handleDescargarReporte()}}>Descargar Reporte PDF</button> */}
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta) => (
                            <tr key={venta.id_venta}>
                                <td>{venta.id_venta}</td>
                                <td>{venta.producto}</td>
                                <td>{venta.precio}</td>
                                <td>{venta.cantidad}</td>
                                <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                                <td>{venta.nombre_cliente}</td>
                                <td>
                                    <button 
                                    className="butonEditar"
                                    onClick={()=>{
                                        setEditar(true);
                                        setID(venta.id_venta)
                                    }}>Editar</button>
                                    <button className="butonEliminar" onClick={
                                        () => eliminaVenta(venta.id_venta)
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

export default Ventas