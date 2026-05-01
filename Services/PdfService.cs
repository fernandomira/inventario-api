using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using InventarioAPI.Models;

namespace InventarioAPI.Services
{
    public class PdfService
    {
        public byte[] GenerarPdf(List<Refaccion> lista)
        {
            using var ms = new MemoryStream();
            var writer = new PdfWriter(ms);
            var pdf = new PdfDocument(writer);
            var doc = new Document(pdf);

            doc.Add(new Paragraph("REPORTE DE INVENTARIO")
                .SetBold().SetFontSize(18));

            foreach (var r in lista)
            {
                doc.Add(new Paragraph($"Nombre: {r.Nombre}"));
                doc.Add(new Paragraph($"No Parte: {r.NoParte}"));
                doc.Add(new Paragraph($"Stock: {r.Stock}"));
                doc.Add(new Paragraph("-----------------------"));
            }

            doc.Close();
            return ms.ToArray();
        }
    }
}