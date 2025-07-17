using HR.DTOs.Department;
using HR.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using static Azure.Core.HttpHeader;

namespace HR.Controllers
{
    [Route("api/Department")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private HRDbContext _dbContext;
        public DepartmentController(HRDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] FilterDepartmentDto filter)
        {
            var data = from department in _dbContext.Departments
                        from lookup in _dbContext.LookUps.Where(x => x.Id == department.TypeId).DefaultIfEmpty()
                        where
                            (filter.Name == null || department.Name.ToLower().Contains(filter.Name.ToLower())) &&
                            (filter.Description == null || department.Description.ToUpper().Contains(filter.Description.ToUpper())) &&
                            (filter.FloorNumber == null || department.FloorNumber == filter.FloorNumber)
                        select new DepartmentDto
                        { 
                            Id          = department.Id,
                            Name        = department.Name,
                            Description = department.Description,
                            FloorNumber = department.FloorNumber,
                            TypeId      = department.TypeId,
                            TypeName    = lookup.Name,
                        };

            return Ok(data);
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] long id)
        {
            var data = _dbContext.Departments.Select(x => new DepartmentDto
            {
                Id          = x.Id,
                Name        = x.Name,
                Description = x.Description,
                FloorNumber = x.FloorNumber,
                TypeId      = x.LookUp.Id,
                TypeName    = x.LookUp.Name,
            }).FirstOrDefault(x => x.Id == id);

            return Ok(data);
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] SaveDepartmentDto departmentDto)
        {
            var newdepartment = new Department
            {
                Id          = 0,
                Name        = departmentDto.Name,
                Description = departmentDto.Description,
                FloorNumber = departmentDto.FloorNumber,
                TypeId      = departmentDto.TypeId
            };
            _dbContext.Departments.Add(newdepartment);
            _dbContext.SaveChanges();

            return Ok(newdepartment);
        }
        [HttpPut("Update")]
        public IActionResult Update([FromBody] SaveDepartmentDto department)
        {
            var data = _dbContext.Departments.First(x => x.Id == department.Id);

            if (data == null)
                return BadRequest("Shaker");

            data.Name        = department.Name;
            data.Description = department.Description;
            data.FloorNumber = department.FloorNumber;
            data.TypeId      = department.TypeId;

            _dbContext.SaveChanges();
            return Ok(data);
        }

        [HttpDelete("Delete")]
        public IActionResult Delete([FromQuery] long id)
        {
            var data = _dbContext.Departments.First(x => x.Id == id);

            if (data == null)
                return BadRequest("Shaker");

            _dbContext.Departments.Remove(data);
            _dbContext.SaveChanges();
            return Ok(data);
        }
    }
}