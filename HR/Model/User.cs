using System.ComponentModel.DataAnnotations;

namespace HR.Model
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        public string UserName { get; set; }
        public string HashedPassword { get; set; }
        public bool IsAdmin { get; set; }
    }
}
