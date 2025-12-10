import React from "react";
import { useState, useEffect } from "react";
import { obtEmpleado, actualizarEmpleado } from "../services/empleadosServices";

import './css/app.css'
import './css/normalize.css'

function EditarEmpleado({id}) {

    const [empleado, guardarEmpleado] = useState({
        nombre: '',
        apellido: '',
        cargo: '',
        edad: null,
        telefono: ''
    })

    // funcion para leer los datos del empleado
    function leeEmpleado(e) {
        guardarEmpleado({
            ...empleado,
            [e.target.name]:e.target.value
        })
    };

    async function actualizaEmple() {
        const resultado = await actualizarEmpleado(id, empleado)
    };

    // function asincrona para obtener el empleado
    async function consultarEmpleado() {
        const resultado = await obtEmpleado(id);
        guardarEmpleado(resultado)    
    }

    useEffect(
        () => {
            consultarEmpleado();
        }, []
    );

    return (
        <>
            <h2>Editar Empleado</h2>
            <form onSubmit={actualizaEmple}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" placeholder="Nombre del Empleado"
                    value={empleado.nombre}
                    onChange={leeEmpleado}/>
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" name="apellido" placeholder="Apellido del Empleado"
                    
                    value={empleado.apellido}
                    onChange={leeEmpleado}/>
                </div>
                <div>
                    <label>Cargo:</label>
                    <input type="text" name="cargo" placeholder="Cargo del Empleado"
                    
                    value={empleado.cargo}
                    onChange={leeEmpleado}/>
                </div>
                <div>
                    <label>Edad:</label>
                    <input type="number" name="edad" 
                    
                    placeholder="Nombre Empleado"
                    
                    value={empleado.edad}
                    onChange={leeEmpleado}/>
                </div>

                <div>
                    <label>Telefono:</label>
                    <input type="text" name="telefono" placeholder="Telefono de Empleado"
                    
                    value={empleado.telefono}
                    onChange={leeEmpleado}/>
                </div>
                <button type="submit">Guardar</button>
            </form>
        </>
    )
}

export default EditarEmpleado
