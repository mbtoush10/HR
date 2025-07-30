﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HR.Model;
using HR.DTOs.Employees;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace HR.Controllers
{
    [Authorize]
    [Route("api/Employees")] // --> Data Anonotation
    [ApiController]          // --> Data Anonotation
    public class EmployeesController : ControllerBase
    {
        private HRDbContext _dbContext;

        //NuGet Pakage 
        public EmployeesController(HRDbContext dbContext)
        {
            _dbContext = dbContext; // Dependency Injection (DI) to get the DbContext instance
        }
        [Authorize(Roles = "HR, Admin")]
        [HttpGet("GetAll")] // --> Data Anonotation
        public IActionResult GetAll([FromQuery]FilterEmployeeDto filterDto)// postion is Optional
        {
            try
            {
                var data = from employee in _dbContext.Employees
                           from department in _dbContext.Departments.Where(x => x.Id == employee.Id).DefaultIfEmpty()      //Left Join
                           from manager in _dbContext.Employees.Where(x => employee.ManagerId == x.Id).DefaultIfEmpty() //Self Join
                           from lookup in _dbContext.LookUps.Where(x => x.Id == employee.PositionId).DefaultIfEmpty()   //Left Join

                           where
                                 (filterDto.PositionId == null || employee.PositionId == filterDto.PositionId) &&          // Filter by Postion or return all if postion is null
                                 (filterDto.Name == null || employee.Name.ToLower().Contains(filterDto.Name.ToLower())) &&
                                 (filterDto.IsActive == null || employee.IsActive == filterDto.IsActive)
                           orderby employee.Id
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
                           };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }
        }

        [HttpGet("GetById")]// --> Query Parameter
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
                return BadRequest("Department Does not exist"); // 400
            }
        }

        [HttpPost("Add")] // --> Request body
        public IActionResult Add( SaveEmployeeDto employeeDto)
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
                _dbContext.Users.Add(user);

                var employee = new Employee()
                {
                    Id = 0, //Ignored, If it is any number other than 0, the database will be forced to take it
                    Name = employeeDto.Name,
                    BirthDate = employeeDto.BirthDate,
                    PositionId = employeeDto.PositionId,
                    IsActive = employeeDto.IsActive,
                    StartDate = employeeDto.StartDate,
                    DepartmentId = employeeDto.DepartmentId,
                    ManagerId = employeeDto.ManagerId,
                    User = user,
                };

                _dbContext.Employees.Add(employee);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }
        }

        [HttpPut("Update")] // --> Request body
        public IActionResult Update(SaveEmployeeDto employeeDto)
        {
            try
            {
                var employee = _dbContext.Employees.FirstOrDefault(x => x.Id == employeeDto.Id);

                if (employee == null)
                    return BadRequest("Employee not found");

                employee.Name = employeeDto.Name;
                employee.BirthDate = employeeDto.BirthDate;
                employee.PositionId = employeeDto.PositionId;
                employee.IsActive = employeeDto.IsActive;
                employee.StartDate = employeeDto.StartDate;
                employee.EndDate = employeeDto.EndDate;
                employee.DepartmentId = employeeDto.DepartmentId;
                employee.ManagerId = employeeDto.ManagerId;

                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
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

                _dbContext.Employees.Remove(employee);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }
        }
    }
}
