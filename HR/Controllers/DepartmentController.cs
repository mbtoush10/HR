using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HR.Model;
using HR.DTOs.Department;
using System.Xml.Linq;

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
            var data = _dbContext.Departments.Where(x => (filter.Name == null || x.Name.ToLower().Contains(filter.Name.ToLower())) &&
                                                          (filter.Description == null || x.Description.ToUpper().Contains(filter.Description.ToUpper())) &&
                                                          (filter.FloorNumber == null || x.FloorNumber == filter.FloorNumber))
                                    .Select(x => new DepartmentDto
                                    {
                                        Id = x.Id,
                                        Name = x.Name,
                                        Description = x.Description,
                                        FloorNumber = x.FloorNumber
                                    });
            return Ok(data);
        }
        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] long id)
        {
            var data = _dbContext.Departments.Select(x => new DepartmentDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                FloorNumber = x.FloorNumber
            }).FirstOrDefault(x => x.Id == id);

            return Ok(data);
        }
        [HttpPost("Add")]
        public IActionResult Add([FromBody] SaveDepartmentDto department)
        {
            var newdepartment = new Department
            {
                Id = 0,
                Name = department.Name,
                Description = department.Description,
                FloorNumber = department.FloorNumber
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

            data.Name = department.Name;
            data.Description = department.Description;
            data.FloorNumber = department.FloorNumber;

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