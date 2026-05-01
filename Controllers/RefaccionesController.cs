using InventarioAPI.Data;
using InventarioAPI.Models;
using InventarioAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventarioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefaccionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RefaccionesController(AppDbContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Refacciones.ToList());
        }

        // POST
        [HttpPost]
        public IActionResult Post([FromBody] Refaccion refaccion)
        {
            try
            {
                //  FORZAR FECHA SI NO VIENE
                refaccion.FechaRegistro = DateTime.UtcNow;

                _context.Refacciones.Add(refaccion);
                _context.SaveChanges();

                return Ok(refaccion);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = ex.Message,
                    detalle = ex.InnerException?.Message
                });
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Refaccion refaccion)
        {
            var existente = _context.Refacciones.Find(id);

            if (existente == null)
                return NotFound();

            existente.Nombre = refaccion.Nombre;
            existente.NoParte = refaccion.NoParte;
            existente.Ubicacion = refaccion.Ubicacion;
            existente.Stock = refaccion.Stock;
            existente.Imagen = refaccion.Imagen;

            _context.SaveChanges();

            return Ok(existente);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> SubirImagen(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No se recibió archivo");

                var carpeta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img");

                if (!Directory.Exists(carpeta))
                    Directory.CreateDirectory(carpeta);

                var nombreArchivo = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                var rutaCompleta = Path.Combine(carpeta, nombreArchivo);

                using (var stream = new FileStream(rutaCompleta, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var rutaBD = "img/" + nombreArchivo;

                return Ok(new { ruta = rutaBD });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = ex.Message,
                    detalle = ex.InnerException?.Message
                });
            }
        }

        [HttpGet("filtrar")]
        public IActionResult Filtrar(DateTime? desde, DateTime? hasta)
        {
            var query = _context.Refacciones.AsQueryable();

            if (desde.HasValue)
                query = query.Where(r => r.FechaRegistro >= desde.Value.ToUniversalTime());

            if (hasta.HasValue)
                query = query.Where(r => r.FechaRegistro <= hasta.Value.ToUniversalTime());

            return Ok(query.ToList());
        }

       
    }
}