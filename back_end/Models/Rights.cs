namespace back_end.Models
{
    public class Rights
    {
        public int Id { get; private set; }
        private string _pavadinimas = null!;
        public string Pavadinimas => _pavadinimas;

        // navigation property for many-to-many
        public ICollection<Roles> Roles { get; set; } = new List<Roles>();
    }
}