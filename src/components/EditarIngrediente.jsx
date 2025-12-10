import React from "react";
import { useState, useEffect } from "react";
import { obtIngrediente, actualizarIngrediente } from "../services/ingredientesServices";
import './css/app.css'
import './css/normalize.css'

const INITIAL_STATE = {
    nombre: '',
    stock_actual: 0,
    costo: 0,
    ubicacion: ''
};
function EditarIngrediente({id}) {

    function validacion() {
        if (ingrediente.nombre.length == 0) {
                            alert("Llene el campo de nombre")
                        } else if (ingrediente.stock_actual < 0) {
                            alert("Nuevo stock invalido")
                        } else if (ingrediente.costo < 0) {
                            alert("Nuevo costo invalido")
                        } else if (ingrediente.ubicacion.length == 0) {
                            alert("Llene el campo de ubicacion")
                        } else {
                            alert("Editado con exito")
                            guardarIngrediente(INITIAL_STATE)
                            
                        }
    }
    


    const [ingrediente, guardarIngrediente] = useState({
        nombre: '',
        stock_actual: 0,
        costo: 0,
        ubicacion: ''
    })

    function leeIngrediente(e) {
        guardarIngrediente({
            ...ingrediente,
            [e.target.name]:e.target.value
        })
    };

    async function actualizaIngrediente(e) {
        e.preventDefault();
        const resultado = await actualizarIngrediente(id, ingrediente)
        
    
    };

    async function consultarIngrediente() {
        const resultado = await obtIngrediente(id);
        guardarIngrediente(resultado.ingrediente || resultado)    
    }

    useEffect(
        () => {
            consultarIngrediente();
        }, [id]
    );

    return (
        <>
            <h2>Editar Ingrediente</h2>
            <form onSubmit={actualizaIngrediente}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" placeholder="Nombre del Ingrediente"
                    value={ingrediente.nombre || ''}
                    onChange={leeIngrediente}/>
                </div>
                <div>
                    <label>Stock Actual:</label>
                    <input type="number" name="stock_actual" 
                    value={ingrediente.stock_actual || 0}
                    onChange={leeIngrediente}/>
                </div>
                <div>
                    <label>Costo Unitario:</label>
                    <input type="number" name="costo" step="0.01" 
                    value={ingrediente.costo || 0}
                    onChange={leeIngrediente}/>
                </div>
                <div>
                    <label>Ubicación:</label>
                    <input type="text" name="ubicacion" placeholder="Ubicación de Almacén"
                    value={ingrediente.ubicacion || ''}
                    onChange={leeIngrediente}/>
                </div>
                <button type="submit" onClick={
                    () => {
                        validacion()
                    }
                }>Guardar</button>
            </form>
        </>
    )
}

export default EditarIngrediente