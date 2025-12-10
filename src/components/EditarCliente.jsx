import React from "react";
import { useState, useEffect } from "react";
import { obtCliente, actualizarCliente } from "../services/clientesServices";

import './css/app.css'
import './css/normalize.css'

function EditarCliente({id}) {

    const [cliente, guardarCliente] = useState({
        nombre: '',
        correo: '',
        contraseña: ''
    })

    function leeCliente(e) {
        guardarCliente({
            ...cliente,
            [e.target.name]:e.target.value
        })
    };

    async function actualizaCliente(e) {
        e.preventDefault();
        const resultado = await actualizarCliente(id, cliente)
    };

    async function consultarCliente() {
        // Asumiendo que obtCliente(id) devuelve el objeto {cliente: {...}} o directamente {...}
        const resultado = await obtCliente(id); 
        // Se puede necesitar adaptar la línea siguiente si el resultado es {cliente: {...}}
        guardarCliente(resultado.cliente || resultado)     
    }

    useEffect(
        () => {
            consultarCliente();
        }, [id] // Dependencia 'id' agregada para recargar si el ID cambia
    );

    return (
        <>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizaCliente}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" placeholder="Nombre del Cliente"
                    value={cliente.nombre || ''}
                    onChange={leeCliente}/>
                </div>
                <div>
                    <label>Correo:</label>
                    <input type="email" name="correo" placeholder="Correo del Cliente"
                    value={cliente.correo || ''}
                    onChange={leeCliente}/>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="contraseña" placeholder="Contraseña (dejar vacío para no cambiar)"
                    value={cliente.contraseña || ''}
                    onChange={leeCliente}/>
                </div>
                <button type="submit"
                onClick={
                    () => {
                        if (cliente.nombre.length == 0) {
                            alert("Nuevo nombre invalido")
                        } else if (validarCorreo(cliente.correo) == "inválido") {
                            alert(" Nuevo correo invalido")
                        } else if (validarContrasena(cliente.contraseña) == "débil") {
                            alert("Nueva contraseña es debil")
                        }else if (validarContrasena(cliente.contraseña) == "intermedia") {
                            alert("Nueva contraseña es intermedia, no es segura aún") 
                        }
                        else {
                            alert("Cliente editado con exito")
                            
                        }
                    }
                }
                
                >Guardar</button>
            </form>
        </>
    )
}

export default EditarCliente