using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.DTOs;
using back_end.Models;
namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly MyDbContext _context;
        public ServicesController(MyDbContext context) => _context = context;

        //GET: api/services
        [HttpGet]
        public IActionResult GetAll()
        {
            var services = _context.Services
                .Select(u => new ServicesDto
                {
                    Id = u.Id,
                    Name = u.Pavadinimas,
                    Price = u.Kaina
                })
                .ToList();
            return Ok(services);
        }

        //GET: api/services
        [HttpGet("{id}")]
        public IActionResult GetService(int id)
        {
            var service = _context.Services
                .Where(u => u.Id == id)
                .Select(u => new ServicesDto
                {
                    Id = u.Id,
                    Name = u.Pavadinimas,
                    Price = u.Kaina
                })
                .ToList();
            return Ok(service);
        }

        //POST: api/services
        [HttpPost]
        public IActionResult Create(ServicesDto servicesDto)
        {
            if (servicesDto == null)
                return BadRequest();

            var services = new Services("temp", 0);

            services.SetPavadinimas(servicesDto.Name);
            services.SetKaina(servicesDto.Price);

            _context.Services.Add(services);
            _context.SaveChanges();

            var createdDto = new ServicesDto
            {
                Id = services.Id,
                Name = services.Pavadinimas,
                Price = services.Kaina
            };

            return CreatedAtAction(nameof(GetService), new { id = createdDto.Id }, createdDto);
        }

        // PUT: api/services/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, ServicesDto servicesDto)
        {
            if (servicesDto == null)
                return BadRequest();

            var service = _context.Services.Find(id);

            if (service == null)
                return NotFound();

            service.SetPavadinimas(servicesDto.Name);
            service.SetKaina(servicesDto.Price);

            _context.Services.Update(service);
            _context.SaveChanges();

            var updatedDto = new ServicesDto
            {
                Id = service.Id,
                Name = service.Pavadinimas
            };

            return Ok(updatedDto);
        }
        
        // PUT: api/services/prices
        [HttpPut("prices")]
        public IActionResult UpdatePrices([FromBody] IEnumerable<ServicesDto> body)
        {
            if (body == null)
                return BadRequest("Neteisingas užklausos formatas.");

            var priceMap = body.ToDictionary(x => x.Id, x => x.Price);
            var ids = priceMap.Keys.ToList();

            var services = _context.Services
                .Where(s => ids.Contains(s.Id))
                .ToList();

            if (!services.Any())
                return NotFound("Paslaugos nerastos.");

            foreach (var s in services)
            {
                var newPrice = priceMap[s.Id];
                s.SetKaina(newPrice);
            }
            _context.SaveChanges();
            var missing = ids.Except(services.Select(s => s.Id)).ToArray();
            var msg = missing.Length == 0
                ? $"Atnaujintos {services.Count} paslaugų kainos."
                : $"Atnaujintos {services.Count} paslaugų kainos. Nerasti ID: {string.Join(", ", missing)}";

            return Ok(msg);
        }

        // DELETE: api/services/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var service = _context.Services.Find(id);

            if (service == null)
                return NotFound(); 

            _context.Services.Remove(service);
            _context.SaveChanges();

            return NoContent(); 
        }
    }
    
}