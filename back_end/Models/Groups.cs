namespace back_end.Models
{
    public class Groups
    {
        public int Id { get; private set; }
        private string _pavadinimas = null!;

        private Groups() { }
        public Groups(string pavadinimas)
        {
            SetName(pavadinimas);
        }

        public string Pavadinimas => _pavadinimas;

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Bendrijos pavadinimas privalomas.");

            _pavadinimas = name;
        }

        public ICollection<Services> Services { get; set; } = new List<Services>();
    }
}