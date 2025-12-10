import { useState, useEffect } from "react";
import NuevoEmpleado from "./NuevoEmpleado.jsx";
import EditarEmpleado from "./EditarEmpleado.jsx";
import ObtenerEmpleado from "./ObtenerEmpleado.jsx";
import { obtEmpleados, eliminarEmpleado, obtEmpleado} from "../services/empleadosServices.jsx";


import './css/app.css'
import './css/normalize.css'

function Empleados() {
    const [empleados, guardarEmpleados] = useState([]);
    const [id, setID] = useState([])
    const [editar, setEditar] = useState(false);
    const [nuevo, setNuevo] = useState(false);
    const [verEmpleado, setVerEmpleado] = useState(false);

    

    async function consultar() {
        const resultado = await obtEmpleados();
        guardarEmpleados(resultado)
        
    }
    useEffect(
        () => {
            consultar();
        }, []
    );

    async function eliminaEmple(id) {
        const resultado = await eliminarEmpleado(id);
        consultar();
    }

    if (editar) {
        return <EditarEmpleado id={id} volver = {
            () => {
                setEditar(false)
            }
        }/>
    }

    

    if (nuevo) {
        return <NuevoEmpleado  volver = {
            () => {
                setNuevo(false)
            }
        }/>
    }

    if (verEmpleado) {
        return <ObtenerEmpleado  volver = {
            () => {
                setVerEmpleado(false)
            }
        }/>
    }


    return (
        <>
            <h2>Lista de Empleados</h2>
            <button 
            className="butonCrear"
            
            onClick={() => {setNuevo(true);}}>Nuevo Empleado</button>
            <button 
            className="butonObtener"
            onClick={
                () => {setVerEmpleado(true)}
            }>Obtener Empleado </button>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Cargo</th>
                        <th>Edad</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empleados.map((empleado) => (
                            <tr key={empleado.id_empleado}>
                                <td>{empleado.id_empleado}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.cargo}</td>
                                <td>{empleado.edad}</td>
                                <td>{empleado.telefono}</td>
                                <td>
                                    <button 
                                    className="butonEditar"
                                    onClick={()=>{
                                        setEditar(true);
                                        setID(empleado.id_empleado)
                                    }}>Editar</button>
                                    <button
                                    
                                    className="butonEliminar" onClick={
                                        () => eliminaEmple(empleado.id_empleado)
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

export default Empleados