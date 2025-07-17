﻿namespace HR.DTOs.Department
{
    public class DepartmentDto
    {
        public long Id { get; set; }
        public String Name { get; set; }
        public string Description { get; set; }
        public int? FloorNumber { get; set; }
        public long? TypeId { get; set; }
        public string? TypeName { get; set; }
    }
}
