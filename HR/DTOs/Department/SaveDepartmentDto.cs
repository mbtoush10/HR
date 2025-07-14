namespace HR.DTOs.Department
{
    public class SaveDepartmentDto
    {
        public long Id { get; set; }
        public String Name { get; set; }
        public string Description { get; set; }
        public int? FloorNumber { get; set; }
    }
}
