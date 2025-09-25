using System.Security.Cryptography;
using System.Text;

namespace back_end.Utils
{
    public static class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            using var sha1 = SHA1.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha1.ComputeHash(bytes);
            return Convert.ToHexString(hash); 
        }
    }
}