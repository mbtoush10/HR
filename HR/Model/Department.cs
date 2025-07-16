using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;

namespace HR.Model
{
    public class Department
    {
        [Key]
        public long Id { get; set; }
        [MaxLength(50)]
        public String Name { get; set; }
        public string Description { get; set; }
        public int? FloorNumber { get; set; }

        [ForeignKey("LookUp")]
        public long? TypeId { get; set; }
        public LookUp? LookUp { get; set; }
    }
}