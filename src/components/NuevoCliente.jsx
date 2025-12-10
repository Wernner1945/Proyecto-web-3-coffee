import { useState } from "react";
import './css/app.css'
import './css/normalize.css'
import {
    insertarCliente
} from '../services/clientesServices.jsx'


function validarContrasena(password) {
    if (password.length < 6) {
        return "débil";
    }

    const tieneMayus = /[A-Z]/.test(password);
    const tieneMinus = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (tieneMayus && tieneMinus && tieneNumero && tieneEspecial && password.length >= 8) {
        return "fuerte";
    }

    const conteo = [tieneMayus, tieneMinus, tieneNumero, tieneEspecial].filter(v => v).length;

    if (conteo >= 2) {
        return "intermedia";
    }

    return "débil";
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo) return false;

    if (!regex.test(correo)) return false;

    const dominio = correo.split("@")[1];

    if (dominio === "gmail.com" || dominio === "hotmail.com" || dominio === "outlook.com") {
        return true;
    }

    return true;
}

function validarCampos() {

    if (cliente.nombre.length  === 0) {
        return "Falata llenar nombre"
    }

    if (!(validarCorreo(cliente.correo))) {
        return "Correo invalido"
    }

    if (validarContrasena(cliente.contraseña) != "fuerte") {
        return "Su contraseña es: " + validarContrasena(cliente.contraseña)
    }

    return true
}

function NuevoCliente() {
    const [cliente, guardarCliente] = useState({
        nombre:"",
        correo: "",
        contraseña: "",
    })


    function leeCliente(e) {
        guardarCliente({
            ...cliente,
            [e.target.name]:e.target.value
        })
    }

    async function insertaCliente(e) {
        e.preventDefault(); 
        const resultado = await insertarCliente(cliente)
        
    }
   

    return (
        <>
            <h2>Nuevo Cliente</h2>
            <form onSubmit={insertaCliente}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" placeholder="Nombre del Cliente"
                    onChange={leeCliente}/>
                </div>
                <div>
                    <label>Correo:</label>
                    <input type="email" name="correo" placeholder="Correo del Cliente"
                    onChange={leeCliente}/>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="contraseña" placeholder="Contraseña"
                    onChange={leeCliente}/>
                </div>
                
                
                <button type="submit"
                onClick={
                    ()=>{
                        if (cliente.nombre.length  === 0) {
                            alert("Falata llenar nombre")
                        } else {
                            if (!(validarCorreo(cliente.correo))) {
                                alert("Correo invalido")
                            } else {
                                if (validarContrasena(cliente.contraseña) != "fuerte") {
                                    alert("Su contraseña es: " + validarContrasena(cliente.contraseña))
                                } else {
                                    alert("Nuevo cliente añadido")
                                }
                            }
                        }

                    }
                }
                
                    
                
                >Guardar</button>
            </form>
        
        </>
    )
}



export default NuevoCliente;