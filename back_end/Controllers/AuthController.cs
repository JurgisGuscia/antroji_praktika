using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.Models;
using back_end.DTOs;
using back_end.Utils;
namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MyDbContext _context;
        public AuthController(MyDbContext context) => _context = context;

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var hashed = PasswordHelper.HashPassword(request.Password);
            var user = _context.Users
                .FirstOrDefault(u => u.UserName == request.Username && u.PasswordHash == hashed);

            if (user != null)
            {
                HttpContext.Session.SetString("User", user.UserName);
                return Ok(new { message = "Prisijungta.", username = user.UserName });
            }
            return Unauthorized("Netinkamas vartotojas arba slaptažodis.");

        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Atsijugnta." });
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            var user = HttpContext.Session.GetString("User");
            if (string.IsNullOrEmpty(user))
            {
                return Unauthorized("Esate neprisijungę.");
            }

            return Ok(new { username = user });
        }



        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto request)
        {
            if (_context.Users.Any(u => u.UserName == request.UserName))
            {
                return BadRequest("Toks vartotojas jau egzistuoja.");
            }

            var hashedPassword = PasswordHelper.HashPassword(request.Password);

            var user = new Users(
                request.Name,
                request.LastName,
                hashedPassword,
                request.UserName,
                request.Gender,
                request.Group,
                request.Role
            );

            _context.Users.Add(user);
            _context.SaveChanges();

            var dto = new RegisterDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                UserName = user.UserName,
                Gender = user.Gender,
                Group = user.Group,
                Role = user.Role
            };

            return Ok(dto);
        }
        
        
    }
}
