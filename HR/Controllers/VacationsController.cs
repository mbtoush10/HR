using HR.DTOs.Vacations;
using HR.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace HR.Controllers
{
    [Authorize]
    [Route("api/VacationsController")]
    [ApiController]
    public class VacationsController : ControllerBase
    {
        private HRDbContext _dbContext;
        public VacationsController(HRDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Authorize(Roles = "Admin,HR")]
        [HttpGet("GetAll")]
        public IActionResult GetAll([FromQuery] FiltterVacationDto filter)
        {
            try
            {
                var data = from vacation in _dbContext.Vacations
                           from lookUp in _dbContext.LookUps.Where(x => x.Id == vacation.TypeId)
                           from employee in _dbContext.Employees.Where(x => x.Id == vacation.EmployeeId)
                           where
                                (filter.VacationTypeId == null || vacation.TypeId == filter.VacationTypeId) &&
                                (filter.EmployeeId == null || vacation.EmployeeId == filter.EmployeeId)
                           select new VacationDto
                           {
                               Id = vacation.Id,
                               EmployeeId = vacation.EmployeeId,
                               EmployeeName = employee.Name,
                               CreationDate = vacation.CreationDate,
                               StartDate = vacation.StartDate,
                               EndDate = vacation.EndDate,
                               TypeId = vacation.TypeId,
                               TypeName = lookUp.Name,
                               Note = vacation.Note
                           };

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }
        }

        [HttpGet("GetById")]
        public IActionResult GetById(long id)
        {
            try
            {
                var data = _dbContext.Vacations.Select(x => new VacationDto
                {
                    Id = x.Id,
                    EmployeeId = x.EmployeeId,
                    EmployeeName = x.Employee.Name,
                    CreationDate = x.CreationDate,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    TypeId = x.TypeId,
                    TypeName = x.LookUp.Name,
                    Note = x.Note
                }).SingleOrDefault(x => x.Id == id);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] SaveVacationDto vacationDto)
        {
            try
            {
                var vacation = new Vacation
                {
                    Id = vacationDto.Id,
                    StartDate = vacationDto.StartDate,
                    EndDate = vacationDto.EndDate,
                    Note = vacationDto.Note,
                    EmployeeId = vacationDto.EmployeeId,
                    TypeId = vacationDto.TypeId,

                };

                _dbContext.Vacations.Add(vacation);
                _dbContext.SaveChanges();

                return Ok(vacation);
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }

        }

        [HttpPut("Update")]
        public IActionResult Update([FromBody] SaveVacationDto vacationDto)
        {
            try
            {
                var vacation = _dbContext.Vacations.FirstOrDefault(x => x.Id == vacationDto.Id);

                if (vacation == null)
                    return BadRequest("Vacation not found");

                vacation.StartDate = vacationDto.StartDate;
                vacation.EndDate = vacationDto.EndDate;
                vacation.Note = vacationDto.Note;
                vacation.EmployeeId = vacationDto.EmployeeId;
                vacation.TypeId = vacationDto.TypeId;

                _dbContext.SaveChanges();
                return Ok(vacation);
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
                var vacation = _dbContext.Vacations.FirstOrDefault(x => x.Id == id);

                if (vacation == null)
                    return BadRequest("Vacation not found");

                _dbContext.Vacations.Remove(vacation);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }
        }
        [HttpPost("EmployeeVacationCount")]
        public IActionResult EmployeeVacationCount()
        {
            try
            {
                var data = from emp in _dbContext.Employees
                           from vac in _dbContext.Vacations.Where(x => x.EmployeeId == emp.Id)
                           group new { Employee = emp, Vacation = vac } // Grouping by employee and vacation
                           by new { Id = emp.Id, Name = emp.Name }      // Grouping by key (employee Id and Name)
                           into vacationCount                           // Creating a group for each employee
                           select new VacationsCountDto
                           {
                               EmployeeId = vacationCount.Key.Id,
                               EmployeeName = vacationCount.Key.Name,
                               VacationCount = vacationCount.ToList().Count(x => x.Vacation != null) // Counting the number of vacations for each employee
                           };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest("Department Does not exist"); // 400
            }
        }
    }
}
