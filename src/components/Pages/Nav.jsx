import React , {useState} from "react";
import IconoMenu from "../iconsComponent/botonMenu";
import IconoMenuNav from "../iconsComponent/logoMenu";
import MenuDesplegable from "../MenuDesplegable";

import '../stylesComponents/MenuNav.css'

import Ayuda from './Ayuda'
import ClientesX from './Clientes'
import EmpleadosX from './EmpleadosList'
import InventarioX from './Inventario'
import VentasX from "./Ventas";
import InicioX from "../Inicio"; 


function MenuNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const [selected, setSelect] = useState("Inicio")

    const cambioEstadoMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="containerPrincipal">
            <div className="container_nav">
                <div className="container_logo">
                    <IconoMenuNav ancho={"2.5em"} alto={"2.5em"}/>
                    <h1 className="titleLogo">Cafetería Dulce Bolivia Admi</h1>
                </div>
                <div className="container_logoMenu">
                    <button onClick={
                        cambioEstadoMenu
                    }>
                        <IconoMenu ancho={"2em"} alto={"2em"}/>
                    </button>
                </div>
                
                {isMenuOpen && (
                    <MenuDesplegable
                    onClose={cambioEstadoMenu}
                    onSelected={setSelect}
                    isOpen={isMenuOpen}/>
                )}
            </div>
            <div className="container_admi">
                <div>              
                    {selected === "Inicio" && <InicioX/>}
                    {selected === "Inventario" && <InventarioX/>}
                    {selected === "Clientes" && <ClientesX />}
                    {selected === "Empleados" && <EmpleadosX/>}
                    
                    {selected === "Ventas" && <VentasX />}
                    {selected === "Ayuda" && <Ayuda />}
                </div>
            </div>

        </div>
    )
}

export default MenuNav;