namespace back_end.Models
{
    public class Roles
    {
        public int Id { get; private set; }
        private string _pavadinimas = null!;

        private Roles() { }
        public Roles(string name)
        {
            SetName(name);
        }

        public string Name => _pavadinimas;

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Bendrijos pavadinimas privalomas.");

            _pavadinimas = name;
        }

        // navigation property for many-to-many
        public ICollection<Rights> Rights { get; set; } = new List<Rights>();
    }
}