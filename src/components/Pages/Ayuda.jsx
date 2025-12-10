import React from "react";
import '../css/ayuda.css'; 

function Ayuda() {
    return (
        <div className="ayuda-container">
            <h2>Ayuda y Soporte de la Plataforma</h2>
            <p className="introduccion">
                Bienvenido al centro de ayuda de Cafetería Dulce Bolivia. Aquí encontrarás guías rápidas para gestionar tu inventario y ventas, además de nuestros datos de contacto.
            </p>

            <section className="seccion-instrucciones">
                <h3>1. Guía Rápida de Manejo</h3>
                
                <h4>Gestión de Ingredientes (Inventario)</h4>
                <ul>
                    <li>🛒 **Agregar Ingrediente:** Ve a *Inventario* y haz clic en "Nuevo Ingrediente". Asegúrate de registrar el `Costo Unitario` para un cálculo preciso del valor del stock.</li>
                    <li>🔄 **Actualizar Stock:** Desde la lista de Inventario, usa el botón "Editar" para modificar el `Stock Actual` y la `Ubicación` del producto.</li>
                </ul>

                <h4>Gestión de Clientes</h4>
                <ul>
                    <li>👤 **Registro:** Usa la sección *Clientes* para agregar nuevos perfiles. Esto es útil para programas de fidelización o gestión de cuentas.</li>
                    <li>🔑 **Contraseñas:** El sistema valida la fortaleza de las contraseñas para garantizar la seguridad de las cuentas de tus clientes.</li>
                </ul>

                <h4>Reportes</h4>
                <ul>
                    <li>📄 **Reporte PDF:** En la sección *Ventas*, puedes generar un reporte detallado en formato PDF para contabilidad o análisis externo.</li>
                </ul>
            </section>

            <section className="seccion-solucion">
                <h3>2. Solución de Problemas Comunes</h3>
                
                <div className="faq-item">
                    <h4>"No puedo guardar un nuevo cliente/ingrediente."</h4>
                    <p>
                        **Verifica la Validación:** Revisa las alertas que aparecen al hacer clic en "Guardar". Asegúrate de que los campos numéricos sean mayores a cero y que el formato del correo electrónico sea válido.
                    </p>
                </div>
                
                <div className="faq-item">
                    <h4>"El reporte PDF da error 404."</h4>
                    <p>
                        **Comprueba el Servidor:** Este error casi siempre significa que el servidor de Node.js donde se genera el reporte está apagado o la ruta API está mal configurada. Reinicia el servidor o contacta al administrador.
                    </p>
                </div>
            </section>

            <section className="seccion-contacto">
                <h3>3. Contacto y Soporte Técnico</h3>
                
                <div className="contacto-info">
                    <h4>Horario de Soporte</h4>
                    <p>Lunes a Viernes: 8:00 AM - 6:00 PM (GMT-4)</p>
                </div>

                <div className="contacto-info">
                    <h4>Detalles de Contacto</h4>
                    <ul>
                        <li>📧 **Correo Electrónico:** <a href="mailto:soporte@dulcebolivia.com">soporte@dulcebolivia.com</a></li>
                        <li>📞 **Teléfono (Soporte Técnico):** +591 2 222-2222</li>
                        <li>📍 **Dirección:** La Paz, Bolivia (Oficinas Centrales)</li>
                    </ul>
                </div>
                
                <div className="contacto-info">
                    <h4>Acerca de la Versión</h4>
                    <p>Versión del Sistema: 1.0.1 | Última Actualización: Diciembre 2025</p>
                </div>
            </section>

        </div>
    );
}

export default Ayuda;