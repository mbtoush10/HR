using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.Model
{
    public class Employee // Model
    {
        [Key]
        public long Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        [MaxLength(50)]
        public String? Phone { get; set; }
        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [ForeignKey("DepartmentRow")]
        public long? DepartmentId { get; set; }
        public Department? DepartmentRow { get; set; }//Navigation proparty

        [ForeignKey("ManagerRow")]
        public long? ManagerId { get; set; }
        public Employee? ManagerRow { get; set; }

        [ForeignKey("LookUp")]
        public long? PositionId { get; set; }
        public LookUp? LookUp { get; set; }

    }
}
