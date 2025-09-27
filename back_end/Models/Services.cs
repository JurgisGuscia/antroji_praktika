namespace back_end.Models
{
    public class Services
    {
        public int Id { get; private set; }
        private string _pavadinimas = null!;
        private float _kaina;

        private Services() { }
        public Services(string pavadinimas, float kaina)
        {
            SetPavadinimas(pavadinimas);
            SetKaina(kaina);
        }

        public string Pavadinimas => _pavadinimas;
        public float Kaina => _kaina;

        public void SetPavadinimas(string pavadinimas)
        {
            if (string.IsNullOrWhiteSpace(pavadinimas))
                throw new ArgumentException("Paslaugos pavadinimas privalomas.");

            _pavadinimas = pavadinimas;
        }

        public void SetKaina(float kaina)
        {
            if (kaina < 0)
                throw new ArgumentException("Paslaugos kaina negali būti neigiama.");
                
            _kaina = kaina;
        }
        
        public ICollection<Groups> Groups { get; set; } = new List<Groups>();
        
    }
}