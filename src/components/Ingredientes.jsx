import { useState, useEffect } from "react";
import NuevoIngrediente from "./NuevoIngrediente.jsx";
import EditarIngrediente from "./EditarIngrediente.jsx";
import ObtenerIngrediente from "./ObtenerIngrediente.jsx";
import { obtIngredientes, eliminarIngrediente } from "../services/ingredientesServices.jsx";


import './css/app.css'
import './css/normalize.css'

function Ingredientes() {
    const [ingredientes, guardarIngredientes] = useState([]);
    const [id, setID] = useState([])
    const [editar, setEditar] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const [verIngrediente, setVerIngrediente] = useState(false);

    

    async function consultar() {
        const resultado = await obtIngredientes();
        guardarIngredientes(resultado)
        
    }
    useEffect(
        () => {
            consultar();
        }, []
    );

    async function eliminaIngrediente(id) {
        const resultado = await eliminarIngrediente(id);
        consultar();
    }

    if (editar) {
        return <EditarIngrediente id={id} volver = {
            () => {
                setEditar(false)
                consultar();
            }
        }/>
    }

    

    if (nuevo) {
        return <NuevoIngrediente volver = {
            () => {
                setNuevo(false)
                consultar();
            }
        }/>
    }

    if (verIngrediente) {
        return <ObtenerIngrediente volver = {
            () => {
                setVerIngrediente(false)
            }
        }/>
    }


    return (
        <>
            <h2>Lista de Ingredientes (Inventario)</h2>
            <button 
            className="butonCrear" onClick={()=> {setNuevo(true);}}>Nuevo Ingrediente</button>
            <button 
            className="butonObtener" onClick={
                () => {setVerIngrediente(true)}
            }>Obtener Ingrediente </button>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock Actual</th>
                        <th>Costo Unitario</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ingredientes.map((ingrediente) => (
                            <tr key={ingrediente.id_ingrediente}>
                                <td>{ingrediente.id_ingrediente}</td>
                                <td>{ingrediente.nombre}</td>
                                <td>{ingrediente.stock_actual}</td>
                                <td>${ingrediente.costo}</td>
                                <td>{ingrediente.ubicacion}</td>
                                <td>
                                    <button className="butonEditar" onClick={()=>{
                                        setEditar(true);
                                        setID(ingrediente.id_ingrediente)
                                    }}>Editar</button>
                                    <button className="butonEliminar" onClick={
                                        () => eliminaIngrediente(ingrediente.id_ingrediente)
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

export default Ingredientes