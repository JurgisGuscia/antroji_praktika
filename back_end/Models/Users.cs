namespace back_end.Models
{
    public class Users
    {
        public int Id { get; private set; }
        private string _name = null!;
        private string _lastName = null!;
        private string _passwordHash = null!;
        private string _userName = null!;
        private string _gender = null!;
        private int _group;
        private int _role;

        private Users() { }

        public Users(string name, string lastName, string passwordHash, string userName, string gender, int group, int role)
        {
            SetName(name);
            SetLastName(lastName);
            SetPasswordHash(passwordHash);
            SetUserName(userName);
            SetGender(gender);
            SetGroup(group);
            SetRole(role);
        }

        public string Name => _name;
        public string LastName => _lastName;
        public string PasswordHash => _passwordHash;
        public string UserName => _userName;
        public string Gender => _gender;
        public int Group => _group;
        public int Role => _role;


        private void HandleInvalid(string str, string log)
        {
            if (string.IsNullOrWhiteSpace(str))
                throw new ArgumentException(log);
        }
        
        public void SetName(string name)
        {
            HandleInvalid(name, "Vardas privalomas.");
            _name = name;
        }

        public void SetLastName(string lastName)
        {
            HandleInvalid(lastName, "Pavarde privaloma.");
            _lastName = lastName;
        }

        public void SetUserName(string username)
        {
            HandleInvalid(username, "Slapyvardis privalomas.");
            _userName = username;
        }

        public void SetPasswordHash(string passwordHash)
        {
            HandleInvalid(passwordHash, "Slaptažodis privalomas.");
            _passwordHash = passwordHash;
        }

        public void SetGender(string gender)
        {
            HandleInvalid(gender, "Lytis privaloma.");
            _gender = gender;
        }

        public void SetGroup(int group) => _group = group;

        public void SetRole(int role) => _role = role;
    }
}