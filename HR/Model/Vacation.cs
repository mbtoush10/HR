using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.Model
{
    public class Vacation
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("Employee")]
        public long EmployeeId { get; set; }
        public Employee Employee { get; set; }// Navigation property

        public DateTime CreationDate { get; set; }= DateTime.Now;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [ForeignKey("LookUp")]
        public long TypeId { get; set; }
        public LookUp LookUp { get; set; } // Navigation property

        public string? Note { get; set; }
    }
}
