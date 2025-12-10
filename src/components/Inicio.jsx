import React from "react";
import './css/Inicio.css';
import IconoMenuNav from "./iconsComponent/logoMenu";
function Inicio() {
    return (
        <div className="inicio-container">
            <div>
                <h1 className="inicio-title">Cafetería Dulce Bolivia - Admi</h1>
            </div>
            <IconoMenuNav ancho={200} alto={200}/>
        </div>
    );
}

export default Inicio;
