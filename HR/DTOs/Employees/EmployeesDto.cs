namespace HR.DTOs.Employees
{
    public class EmployeeDto // data Transfer Object
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int? Age { get; set; }
        public string Position { get; set; }
        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; }
        public string? Phone { get; set; }
        public long? DepartmentId { get; set; }
        public long? ManagerId { get; set; }
        public string? DepartmentName { get; set; }
        public string? ManagerName { get; set; }
    }
}
