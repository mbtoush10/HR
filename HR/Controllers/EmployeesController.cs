using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HR.Model;
using HR.DTOs.Employees;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using HR.DTOs.SharedDTO;
using HR.Enums;

namespace HR.Controllers
{
    [Authorize]
    [Route("api/Employees")] // --> Data Anonotation
    [ApiController]          // --> Data Anonotation
    public class EmployeesController : ControllerBase
    {
        private HRDbContext _dbContext;
        private IWebHostEnvironment _env;
        private IConfiguration _config;

        //NuGet Pakage 
        public EmployeesController(HRDbContext dbContext, IWebHostEnvironment env, IConfiguration config)
        {
            _dbContext = dbContext; // Dependency Injection (DI) to get the DbContext instance
            _env = env;
            _config = config;
        }
        [Authorize(Roles = "HR, Admin")]
        [HttpGet("GetAll")] // --> Data Anonotation
        public IActionResult GetAll([FromQuery] FilterEmployeeDto filterDto)// postion is Optional
        {
            try
            {
                var data = from employee in _dbContext.Employees
                           from department in _dbContext.Departments.Where(x => x.Id == employee.DepartmentId).DefaultIfEmpty() //Left Join
                           from manager in _dbContext.Employees.Where(x => employee.ManagerId == x.Id).DefaultIfEmpty()         //Self Join
                           from lookup in _dbContext.LookUps.Where(x => x.Id == employee.PositionId).DefaultIfEmpty()           //Left Join
                           where
                                 (filterDto.PositionId == null || employee.PositionId == filterDto.PositionId) &&               // Filter by Postion or return all if postion is null
                                 (filterDto.Name == null || employee.Name.ToLower().Contains(filterDto.Name.ToLower())) &&
                                 (filterDto.IsActive == null || employee.IsActive == filterDto.IsActive)
                           orderby employee.Id descending
                           select new EmployeeDto
                           {
                               Id = employee.Id,
                               Name = employee.Name,
                               PositionId = employee.PositionId,
                               PositionName = lookup.Name,
                               BirthDate = employee.BirthDate,
                               IsActive = employee.IsActive,
                               StartDate = employee.StartDate,
                               Phone = employee.Phone,
                               ManagerId = employee.ManagerId,
                               ManagerName = manager.Name,
                               DepartmentId = employee.DepartmentId,
                               DepartmentName = department.Name,
                               ImagePath = employee.ImagePath != null ? Path.Combine(_config["BaseUrl"],employee.ImagePath) : "",
                           };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }

        //[HttpGet("GetById")]// --> Query Parameter
        public IActionResult GetById(long id)
        {
            try
            {
                var data = _dbContext.Employees.Select(employee => new EmployeeDto
                {
                    Id = employee.Id,
                    Name = employee.Name,
                    PositionId = employee.PositionId,
                    PositionName = employee.LookUp.Name,
                    BirthDate = employee.BirthDate,
                    IsActive = employee.IsActive,
                    StartDate = employee.StartDate,
                    Phone = employee.Phone,
                    ManagerId = employee.ManagerId,
                    ManagerName = employee.ManagerRow.Name,
                    DepartmentId = employee.DepartmentId,
                    DepartmentName = employee.DepartmentRow.Name,

                }).FirstOrDefault(x => x.Id == id);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }

        [HttpPost("Add")] // --> Request body
        public IActionResult Add([FromForm] SaveEmployeeDto employeeDto)
        {
            try
            {
                var user = new User()
                {
                    Id = 0,
                    UserName = $"{employeeDto.Name}_Hr",
                    HashedPassword = BCrypt.Net.BCrypt.HashPassword($"{employeeDto.Name}@123"),
                    IsAdmin = false
                };

                var _user = _dbContext.Users.FirstOrDefault(x => x.UserName.ToLower() == user.UserName.ToLower());
                if (_user != null)
                    return BadRequest("Cannot add employee, user already exists");


                _dbContext.Users.Add(user);

                var employee = new Employee()
                {
                    Id = 0, // Ignored, If it is any number other than 0, the database will be forced to take it
                    Name = employeeDto.Name,
                    BirthDate = employeeDto.BirthDate,
                    Phone = employeeDto.Phone,
                    PositionId = employeeDto.PositionId,
                    IsActive = employeeDto.IsActive,
                    StartDate = employeeDto.StartDate,
                    DepartmentId = employeeDto.DepartmentId,
                    ManagerId = employeeDto.ManagerId,
                    User = user,
                    ImagePath = null
                };

                if (employeeDto.Image != null)
                    employee.ImagePath = UploadImage(employeeDto.Image);
                

                _dbContext.Employees.Add(employee);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }

        [HttpPut("Update")] // --> Request body
        public IActionResult Update([FromForm] SaveEmployeeDto employeeDto)
        {

            try
            {
                var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == employeeDto.Id);

                if (employee == null)
                    return BadRequest("Employee not found");

                employee.Name = employeeDto.Name;
                employee.BirthDate = employeeDto.BirthDate;
                employee.Phone = employeeDto.Phone;
                employee.PositionId = employeeDto.PositionId;
                employee.IsActive = employeeDto.IsActive;
                employee.StartDate = employeeDto.StartDate;
                employee.EndDate = employeeDto.EndDate;
                employee.DepartmentId = employeeDto.DepartmentId;
                employee.ManagerId = employeeDto.ManagerId;
                if (employeeDto.Image != null)
                    employee.ImagePath = UploadImage(employeeDto.Image);
                else if (employeeDto.Image == null && employeeDto.IsImage == false)
                    employee.ImagePath = null;

                    _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(long id)
        {
            try
            {
                var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == id);

                if (employee == null)
                    return BadRequest("Employee not found");

                var employeeAssociations = _dbContext.Employees.FirstOrDefault(e => e.ManagerId == id);

                if(employeeAssociations != null)
                    return BadRequest(new Exception("Managers with assigned employees cannot be deleted.")); // Employee is a manager of other employees

                _dbContext.Employees.Remove(employee);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }
        
        [HttpGet("GetManagersList")]
        public IActionResult GetManagersList([FromQuery] long? employeeId)
        {
            try
            {
                var data = _dbContext.Employees.Where(emp => emp.LookUp != null && 
                emp.LookUp.MajorCode == (int)LookUpMajorCodes.EmployeePositions && 
                emp.LookUp.MinorCode == (int)LookUpMinorCodes.Manager && 
                emp.IsActive &&
                emp.Id != employeeId)
                    .Select(manger => new ListDTO
                    {
                        Id   = manger.Id,
                        Name = manger.Name
                    });
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400

            }
        }

        private string UploadImage(IFormFile Image)
        {
            // var imagesFolderPath = "Attachments\\EmployeeImages";
            var imagesFolderPath = Path.Combine("Attachments", "EmployeeImages");

            var folderPath = Path.Combine(_env.WebRootPath, imagesFolderPath);
            if(!Directory.Exists(folderPath))
                // Create Folder
                Directory.CreateDirectory(folderPath);

            var fileExtension = Path.GetExtension(Image.FileName); // Get the file extension: .jpg, .png, ...
            var fileName = Guid.NewGuid().ToString(); // Generate Unique Name for the file: 23f45e89-8b5a-5c55-9df7-240d78a3ce15

            fileName += fileExtension; // 23f45e89-8b5a-5c55-9df7-240d78a3ce15.jpg

            var filePath = Path.Combine(folderPath, fileName); // S:\Attachments\EmployeeImages\23f45e89-8b5a-5c55-9df7-240d78a3ce15.jpg

            using(var stream = new FileStream(filePath, FileMode.Create)) // Open a stream to the file path with Create mode (will create the file if it doesn't exist)
                Image.CopyTo(stream); // Copy the content of the uploaded image to the file stream, which will save it to the specified location

            return Path.Combine(imagesFolderPath, fileName); // Return the file path to be stored in the database
        }

    }
}