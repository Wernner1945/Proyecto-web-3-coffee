import React from "react";
import './stylesComponents/MenuDesplegable.css'

function MenuDesplegable ({onClose, onSelected}) {
    return (
        <ul className="list_container">
            <li>
                <a href="" onClick={
                    (e) => { 
                        e.preventDefault();// evitar recargar
                        onClose(); // Llama a la primera función
                        onSelected("Inicio");
                    }
                    }>Inicio</a>
            </li>
            <li>
                <a href="" onClick={
                    (e) => {
                        e.preventDefault(),
                        onClose(),
                        onSelected("Empleados")
                    }
                }>Empleados</a>
            </li>
            <li>
                <a href="" onClick={
                    
                    (e) => {
                        e.preventDefault(),
                        onClose(),
                        onSelected("Clientes")
                    }
                }>Clientes</a>
            </li>
            <li>
                <a href="" onClick={
                    (e) => {
                        e.preventDefault(),
                        onClose(),
                        onSelected("Ventas")
                    }
                }>Ventas</a>
            </li>
            <li>
                <a href="" onClick={
                    (e) => {
                        e.preventDefault(),
                        onClose(),
                        onSelected("Inventario")
                    }
                }>Inventario</a>
            </li>
            <li>
                <a href="" onClick={
                    (e) => {
                        e.preventDefault(),
                        onClose(),
                        onSelected("Ayuda")
                    }
                }>Ayuda</a>
            </li>
        </ul>

    )
}

export default MenuDesplegable;