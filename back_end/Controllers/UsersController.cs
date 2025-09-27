using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.DTOs;
using back_end.Models;
namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _context;
        public UsersController(MyDbContext context) => _context = context;

        private string HashPassword(string str)
        {
            using (var sha1 = System.Security.Cryptography.SHA1.Create())
            {
                var bytes = System.Text.Encoding.UTF8.GetBytes(str);
                var hashBytes = sha1.ComputeHash(bytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
            }
        }

        // GET: api/users
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users
                .AsEnumerable()
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    LastName = u.LastName,
                    UserName = u.UserName,
                    Gender = u.Gender,
                    Group = u.Group,   
                    Role = u.Role
                })
                .ToList();


            return Ok(users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users
                .AsEnumerable()
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    LastName = u.LastName,
                    UserName = u.UserName,
                    Gender = u.Gender,
                    Group = u.Group,   // client-side
                    Role = u.Role
                })
                .FirstOrDefault();


            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public IActionResult Create(UserDto userDto)
        {
            if (userDto == null)
                return BadRequest();

            var user = new Users("temp", "temp", "hash", "temp", "temp", null, 3);

            user.SetName(userDto.Name);
            user.SetLastName(userDto.LastName);
            user.SetUserName(userDto.UserName);
            user.SetPasswordHash(HashPassword(userDto.Password));
            user.SetGender(userDto.Gender);
            user.SetGroup(userDto.Group);
            user.SetRole(userDto.Role);

            _context.Users.Add(user);
            _context.SaveChanges();

            var createdDto = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                UserName = user.UserName,
                Password = user.PasswordHash,
                Gender = user.Gender,
                Group = user.Group,
                Role = user.Role
            };

            return CreatedAtAction(nameof(GetUser), new { id = createdDto.Id }, createdDto);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserDto userDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            user.SetName(userDto.Name);
            user.SetLastName(userDto.LastName);
            user.SetUserName(userDto.UserName);
            user.SetGender(userDto.Gender);
            user.SetGroup(userDto.Group);
            user.SetRole(userDto.Role);

            if (!string.IsNullOrWhiteSpace(userDto.Password))
            {
                user.SetPasswordHash(HashPassword(userDto.Password));
            }

            _context.SaveChanges();

            return Ok("Vartotojo duomenys atnaujinti.");
        }
        
        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
                return NotFound(); 

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent(); 
        }


        // PUT: api/users/assignUsers/{group}
        [HttpPut("assignUsers/{group}")]
        public IActionResult AssignGroup(int group, [FromBody] int[] selectedUsers)
        {
            if (selectedUsers == null)
                return BadRequest("Pateiktas neteisingas vartotojų sąrašas.");
                
            if (!_context.Groups.Any(g => g.Id == group))
                return BadRequest($"Grupė su id {group} neegzistuoja.");
                
            var currentGroupUsers = _context.Users
                    .AsEnumerable()
                    .Where(u => u.Group == group)
                    .ToList();

            foreach (var user in currentGroupUsers)
                user.SetGroup(null);

            var usersToAssign = _context.Users.Where(u => selectedUsers.Contains(u.Id)).ToList();
            foreach (var user in usersToAssign)
                user.SetGroup(group);

            _context.SaveChanges();
            return Ok("Duomenys atnaujinti.");
        }
    }
}
