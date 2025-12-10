import { useState } from "react";
import './css/app.css'
import './css/normalize.css'
import {
    insertarEmpleado
} from '../services/empleadosServices.jsx'

function NuevoEmpleado() {
    const [empleado, guardarEmpleado] = useState({
        nombre:"",
        apellido: "",
        cargo: "",
        edad: 0,
        telefono: ""

    })


    function leeEmpleado(e) {
        guardarEmpleado({
            ...empleado,
            [e.target.name]:e.target.value
        })
    }

    async function insertaEmpleado() {
        const resultado = await insertarEmpleado(empleado)
        
    }

    return (
        <>
            <h2>Nuevo Empleado</h2>
            <form onSubmit={insertaEmpleado}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" placeholder="Nombre del Empleado"
                    onChange={leeEmpleado}/>
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" name="apellido" placeholder="Apellido del Empleado"
                    onChange={leeEmpleado}/>
                </div>
                <div>
                    <label>Cargo:</label>
                    <input type="text" name="cargo" placeholder="Cargo del Empleado"
                    onChange={leeEmpleado}/>
                </div>
                <div>
                    <label>Edad:</label>
                    <input type="number" name="edad" 
                    
                    placeholder="Nombre Empleado"
                    onChange={leeEmpleado}/>
                </div>

                <div>
                    <label>Telefono:</label>
                    <input type="text" name="telefono" placeholder="Telefono de Empleado"
                    onChange={leeEmpleado}/>
                </div>
                <button type="submit" 
                onClick={
                    () => {
                        if (empleado.nombre.length == 0) {
                            alert("Llene el campo de nombre de empleado")
                        } else if (empleado.apellido.length == 0) {
                            alert("Llene campo de apellidos")
                        } else if (empleado.cargo.length == 0) {
                            alert("Llene campo de cargo")
                        } else if (empleado.edad < 0) {
                            alert("Ingrese una edad valida")
                        } else if (empleado.telefono.length == 0) {
                            alert("Llene campo de telefono ")
                        } else {
                            alert("Nuevo empleado añadido con exito")
                            
                        }
                    }
                }
                
                >Guardar</button>
            </form>
        
        </>
    )
}
export default NuevoEmpleado;