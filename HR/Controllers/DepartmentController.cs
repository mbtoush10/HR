using HR.DTOs.Department;
using HR.DTOs.SharedDTO;
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
            try
            {
                var data = from department in _dbContext.Departments
                           from lookup in _dbContext.LookUps.Where(x => x.Id == department.TypeId).DefaultIfEmpty()
                           where
                               (filter.Name == null || department.Name.ToLower().Contains(filter.Name.ToLower())) &&
                               (filter.Description == null || department.Description.ToUpper().Contains(filter.Description.ToUpper())) &&
                               (filter.FloorNumber == null || department.FloorNumber == filter.FloorNumber)
                           select new DepartmentDto
                           {
                               Id = department.Id,
                               Name = department.Name,
                               Description = department.Description,
                               FloorNumber = department.FloorNumber,
                               TypeId = department.TypeId,
                               TypeName = lookup.Name,
                           };

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }

        [HttpGet("GetById")]
        public IActionResult GetById([FromQuery] long id)
        {
            try
            {
                var data = _dbContext.Departments.Select(x => new DepartmentDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    FloorNumber = x.FloorNumber,
                    TypeId = x.LookUp.Id,
                    TypeName = x.LookUp.Name,
                }).FirstOrDefault(x => x.Id == id);

                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] SaveDepartmentDto departmentDto)
        {
            try
            {
                var newdepartment = new Department
                {
                    Id = 0,
                    Name = departmentDto.Name,
                    Description = departmentDto.Description,
                    FloorNumber = departmentDto.FloorNumber,
                    TypeId = departmentDto.TypeId
                };
                _dbContext.Departments.Add(newdepartment);
                _dbContext.SaveChanges();

                return Ok(newdepartment);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }
        [HttpPut("Update")]
        public IActionResult Update([FromBody] SaveDepartmentDto department)
        {
            try
            {
                var data = _dbContext.Departments.FirstOrDefault(x => x.Id == department.Id);

                if (data == null)
                    return BadRequest("Shaker");

                data.Name = department.Name;
                data.Description = department.Description;
                data.FloorNumber = department.FloorNumber;
                data.TypeId = department.TypeId;

                _dbContext.SaveChanges();
                return Ok(data); // 200
            }
            catch (Exception ex){ // General Exception
             
                return BadRequest(ex.Message); // 400
            }
        }

        [HttpDelete("Delete")]
        public IActionResult Delete([FromQuery] long id)
        {
            try
            {
                var data = _dbContext.Departments.First(x => x.Id == id);

                if (data == null)
                    return BadRequest("Shaker");

                _dbContext.Departments.Remove(data);
                _dbContext.SaveChanges();
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }
        [HttpGet("GetDepartmentsList")]
        public IActionResult GetDepartmentsList()
        {
            try
            {
                var data = _dbContext.Departments.Select(department => new ListDTO
                {
                    Id = department.Id,
                    Name = department.Name
                });
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400

            }
        }
    }
}