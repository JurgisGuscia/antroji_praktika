using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.DTOs;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly MyDbContext _context;
        public GroupsController(MyDbContext context) => _context = context;

        //GET: api/groups
        [HttpGet]
        public IActionResult GetAll()
        {
            var groups = _context.Groups
                .Select(u => new GroupsDto
                {
                    Id = u.Id,
                    Name = u.Pavadinimas
                })
                .ToList();
            return Ok(groups);
        }

        //GET: api/groups
        [HttpGet("{id}")]
        public IActionResult GetBendrija(int id)
        {
            var group = _context.Groups
                .Where(u => u.Id == id)
                .Select(u => new GroupsDto
                {
                    Id = u.Id,
                    Name = u.Pavadinimas
                })
                .ToList();
            return Ok(group);
        }

        //POST: api/groups
        [HttpPost]
        public IActionResult Create(GroupsDto groupsDto)
        {
            if (groupsDto == null)
                return BadRequest();

            var group = new Groups("temp");

            group.SetName(groupsDto.Name);

            _context.Groups.Add(group);
            _context.SaveChanges();

            var createdDto = new GroupsDto
            {
                Id = group.Id,
                Name = group.Pavadinimas
            };

            return CreatedAtAction(nameof(GetBendrija), new { id = createdDto.Id }, createdDto);
        }

        // PUT: api/groups/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, GroupsDto groupsDto)
        {
            if (groupsDto == null)
                return BadRequest();

            var group = _context.Groups.Find(id);

            if (group == null)
                return NotFound();

            group.SetName(groupsDto.Name);

            _context.Groups.Update(group);
            _context.SaveChanges();

            var updatedDto = new GroupsDto
            {
                Id = group.Id,
                Name = group.Pavadinimas
            };

            return Ok(updatedDto);
        }

        // DELETE: api/groups/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var group = _context.Groups.Find(id);

            if (group == null)
                return NotFound();

            _context.Groups.Remove(group);
            _context.SaveChanges();

            return NoContent();
        }
        

        //=================================================================================
        //Groups <-> Services Junction methods

        // GET: api/groups/{groupId}/services
        [HttpGet("{groupId}/services")]
        public IActionResult GetServicesForGroup(int groupId)
        {
            var group = _context.Groups
                .Include(g => g.Services)
                .FirstOrDefault(g => g.Id == groupId);

            if (group == null)
                return NotFound($"Bendrija {groupId} nerasta.");

            var services = group.Services
                .Select(s => new ServicesDto
                {
                    Id = s.Id,
                    Name = s.Pavadinimas
                })
                .ToList();

            return Ok(services);
        }

        public class UpdateServicesDto
        {
            public List<int> ServicesList { get; set; } = new();
        }

        // PUT: api/groups/{groupId}/services
        [HttpPut("{groupId}/services")]
        public IActionResult UpdateGroupServices(int groupId, [FromBody] UpdateServicesDto dto)
        {
            var group = _context.Groups
                .Include(g => g.Services)
                .FirstOrDefault(g => g.Id == groupId);

            if (group == null)
                return NotFound($"Group {groupId} not found.");

            group.Services.Clear();

            var services = _context.Services
                .Where(s => dto.ServicesList.Contains(s.Id))
                .ToList();


            foreach (var service in services)
                group.Services.Add(service);

            _context.SaveChanges();

            return Ok(new
            {
                GroupId = groupId,
                Services = services.Select(s => s.Id).ToList()
            });
        }



    }
    
}