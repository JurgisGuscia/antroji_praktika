namespace back_end.DTOs
{
    public class RegisterDto
    {
        public int Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public int? Group { get; set; }
        public int? Role { get; set; }
    }
}