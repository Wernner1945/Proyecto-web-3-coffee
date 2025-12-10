// backend/controladores/ReportesController.js
import PDFDocument from 'pdfkit';


import { obtener_todo as obtenerVentasModelo } from '../modelos/VentasModelo.js'; 

export const generarReporteDeVentas = async (req, res) => {
    try {
        
        const ventas = await obtenerVentasModelo();

        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_ventas.pdf');

        
        const doc = new PDFDocument();
        doc.pipe(res); 

    

        // Título
        doc.fontSize(20).text('Reporte de Ventas de Cafetería', { align: 'center' });
        doc.moveDown();

        doc.fontSize(10).text(`Fecha de Generación: ${new Date().toLocaleDateString()}`);
        doc.moveDown(2);

        const startY = doc.y;
        doc.fontSize(12);

        doc.text('ID', 50, startY, { width: 50, align: 'left' });
        doc.text('Producto', 100, startY, { width: 150, align: 'left' });
        doc.text('Cantidad', 280, startY, { width: 80, align: 'left' });
        doc.text('Total', 380, startY, { width: 80, align: 'right' });
        doc.moveDown(0.5);
        doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.5);

        let totalGeneral = 0;
        let y = doc.y;

        ventas.forEach(venta => {
            const precioTotal = venta.precio * venta.cantidad;
            totalGeneral += precioTotal;

            if (y > 750) {
                doc.addPage();
                y = 50; 
                
            }

            doc.fontSize(10);
            doc.text(venta.id_venta.toString(), 50, y, { width: 50, align: 'left' });
            doc.text(venta.producto, 100, y, { width: 150, align: 'left', ellipsis: true });
            doc.text(venta.cantidad.toString(), 280, y, { width: 80, align: 'left' });
            doc.text(`$${precioTotal.toFixed(2)}`, 380, y, { width: 80, align: 'right' });

            y += 20; 
            doc.y = y; 
        });
        
        doc.moveDown();
        doc.strokeColor('#000000').lineWidth(2).moveTo(370, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(0.5);

        doc.fontSize(14).text(`Total General: $${totalGeneral.toFixed(2)}`, 370, doc.y, { align: 'right' });

        doc.end();

    } catch (error) {
        console.error("Error al generar PDF:", error);
        res.status(500).send("Error interno al generar el reporte.");
    }
};