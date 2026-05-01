using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventarioAPI.Models
{
    [Table("refacciones")]
    public class Refaccion
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("nombre")]
        public string Nombre { get; set; }

        [Column("no_parte")]
        public string NoParte { get; set; }

        [Column("ubicacion")]
        public string Ubicacion { get; set; }

        [Column("stock")]
        public int Stock { get; set; }

        // 🔥 ESTE ERA EL ERROR
        [Column("imagen")]
        public string Imagen { get; set; }

        [Column("fecha_registro")]
        public DateTime FechaRegistro { get; set; }
    }
}