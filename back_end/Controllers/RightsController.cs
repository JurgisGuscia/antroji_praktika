using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.DTOs;
using back_end.Models;
namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RightsController : ControllerBase
    {
        private readonly MyDbContext _context;
        public RightsController(MyDbContext context) => _context = context;

        //GET: api/rights
        [HttpGet]
        public IActionResult GetAll()
        {
            var rights = _context.Rights
                .Select(u => new RightsDto
                {
                    Id = u.Id,
                    Name = u.Pavadinimas
                })
                .ToList();
            return Ok(rights);
        }

        //GET: api/rights
        [HttpGet("{id}")]
        public IActionResult GetRight(int id)
        {
            var right = _context.Rights
                .Where(u => u.Id == id)
                .Select(u => new RightsDto
                {
                    Id = u.Id,
                    Name = u.Pavadinimas
                })
                .ToList();
            return Ok(right);
        }
    }
}