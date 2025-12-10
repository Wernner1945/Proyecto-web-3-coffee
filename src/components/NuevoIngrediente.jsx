import { useState } from "react";
import './css/app.css'
import './css/normalize.css'
import {
    insertarIngrediente
} from '../services/ingredientesServices.jsx'


const INITIAL_STATE = {
    nombre: '',
    stock_actual: 0,
    costo: 0,
    ubicacion: ''
};


function NuevoIngrediente() {
    
    
    
    
    const [ingrediente, guardarIngrediente] = useState({
        nombre:'',
        stock_actual: 0,
        costo: 0,
        ubicacion: ''
    })

    

    function leeIngrediente(e) {
        guardarIngrediente({
            ...ingrediente,
            [e.target.name]:e.target.value
        })
    }

    async function insertaIngrediente(e) {
        e.preventDefault();
        if (ingrediente.nombre.length == 0) {
                alert("Llene el campo de nombre")
                return;
            } else if (ingrediente.stock_actual == 0) {
                alert("Ingrese un stock invalido")
                return;
            } else if (ingrediente.costo == 0) {
                alert("Ingrese un costo invalido")
                return;
            } else if (ingrediente.ubicacion.length == 0) {
                alert("Llene el campo de ubicacion")
                return;
            } 
        
        try {
            const resultado = await insertarIngrediente(ingrediente)
            alert("Nuevo Ingrediente Agregado con exito")
            guardarIngrediente(INITIAL_STATE)
        } catch (error) {
            alert("Sucedio un error")
        }

        
    }

    return (
        <>
            <h2>Nuevo Ingrediente de Inventario</h2>
            <form onSubmit={insertaIngrediente}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" placeholder="Nombre del Ingrediente"
                    onChange={leeIngrediente}/>
                </div>
                <div>
                    <label>Stock Actual:</label>
                    <input type="number" name="stock_actual" 
                    placeholder="Cantidad en Stock"
                    onChange={leeIngrediente}/>
                </div>
                <div>
                    <label>Costo Unitario:</label>
                    <input type="number" name="costo" step="0.01"
                    placeholder="Costo por unidad"
                    onChange={leeIngrediente}/>
                </div>
                <div>
                    <label>Ubicación:</label>
                    <input type="text" name="ubicacion" 
                    placeholder="Ubicación (ej. Alacena 1)"
                    onChange={leeIngrediente}/>
                </div>
                <button type="submit" 
                    
                >Guardar</button>
            </form>
        
        </>
    )
}
export default NuevoIngrediente;