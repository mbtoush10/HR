﻿namespace HR.DTOs.Employees
{
    public class EmployeeDto // data Transfer Object
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; }
        public string? Phone { get; set; }
        public long? DepartmentId { get; set; }
        public long? ManagerId { get; set; }
        public string? DepartmentName { get; set; }
        public string? ManagerName { get; set; }
        public long? PositionId { get; set; }
        public string? PositionName { get; set; }

    }
}
