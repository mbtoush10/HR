namespace HR.DTOs.Employees
{
    public class FilterEmployeeDto
    {
        public string? Position {  get; set; }
        public string? Name { get; set; }
        public bool? IsActive { get; set; }

    }
}
