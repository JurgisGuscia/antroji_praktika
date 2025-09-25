using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.DTOs;
using back_end.Models;
using Microsoft.EntityFrameworkCore;
namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly MyDbContext _context;
        public RolesController(MyDbContext context) => _context = context;


        //GET: api/roles
        [HttpGet]
        public IActionResult GetAll()
        {
            var roles = _context.Roles
                .Select(u => new RolesDto
                {
                    Id = u.Id,
                    Name = u.Name
                })
                .ToList();
            return Ok(roles);
        }

        //GET: api/roles/{id}
        [HttpGet("{id}")]
        public IActionResult GetRole(int id)
        {
            var role = _context.Roles
                .Where(u => u.Id == id)
                .Select(u => new RolesDto
                {
                    Id = u.Id,
                    Name = u.Name
                })
                .ToList();
            return Ok(role);
        }

        //POST: api/roles
        [HttpPost]
        public IActionResult Create(RolesDto rolesDto)
        {
            if (rolesDto == null)
                return BadRequest();

            var role = new Roles("temp");

            role.SetName(rolesDto.Name);

            _context.Roles.Add(role);
            _context.SaveChanges();

            var createdDto = new GroupsDto
            {
                Id = role.Id,
                Name = role.Name
            };

            return CreatedAtAction(nameof(GetRole), new { id = createdDto.Id }, createdDto);
        }

        // PUT: api/roles/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, RolesDto rolesDto)
        {
            if (rolesDto == null)
                return BadRequest();

            var role = _context.Roles.Find(id);

            if (role == null)
                return NotFound();

            role.SetName(rolesDto.Name);

            _context.Roles.Update(role);
            _context.SaveChanges();

            var updatedDto = new GroupsDto
            {
                Id = role.Id,
                Name = role.Name
            };

            return Ok(updatedDto);
        }

        // DELETE: api/groups/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var role = _context.Roles.Find(id);

            if (role == null)
                return NotFound();

            _context.Roles.Remove(role);
            _context.SaveChanges();

            return NoContent();
        }

        //=================================================================================
        //Roles <-> Rights Junction methods

        public class UpdateRightsDto
        {
            public List<int> RightsList { get; set; } = new();
        }

        // PUT: api/roles/{roleId}/rights
        [HttpPut("{roleId}/rights")]
        public async Task<IActionResult> UpdateRoleRights(int roleId, [FromBody] UpdateRightsDto dto)
        {
            var role = await _context.Roles
                .Include(r => r.Rights)
                .FirstOrDefaultAsync(r => r.Id == roleId);

            if (role == null)
                return NotFound($"Vartotoju grupė {roleId} nerasta.");

            role.Rights.Clear();

            // Fetch rights that match the provided IDs
            var rights = await _context.Rights
                .Where(r => dto.RightsList.Contains(r.Id))
                .ToListAsync();

            // Assign them to the role
            foreach (var right in rights)
                role.Rights.Add(right);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                RoleId = roleId,
                Rights = rights.Select(r => r.Id).ToList()
            });
        }
        
        // GET: api/roles/{roleId}/rights
        [HttpGet("{roleId}/rights")]
        public async Task<IActionResult> GetRightsForRole(int roleId)
        {
            var rights = await _context.Roles
                .Where(r => r.Id == roleId)
                .Select(r => r.Rights
                    .Select(rt => new { rt.Id, rt.Pavadinimas }))
                .FirstOrDefaultAsync();

            if (rights == null)
                return NotFound();

            return Ok(rights);                 
        }

    }
}