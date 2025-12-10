import axios from "axios";

const API_URL = "/api/reportes";

export const descargarReporteVentas = async () => {
    try {
        const response = await axios.get(`${API_URL}/ventas/pdf`, {
            responseType: 'blob', 
        });

        const fileURL = window.URL.createObjectURL(new Blob(
            [response.data], 
            { type: 'application/pdf' }
        ));

        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'reporte_ventas.pdf'); 

        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();

        return { success: true };
    } catch (error) {
        console.error("Error al descargar el PDF:", error);
        return { success: false, error: error.message };
    }
};