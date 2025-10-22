using HR.DTOs.SharedDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HR.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LookUpsController : ControllerBase
    {
        private HRDbContext _dbContext;
        public LookUpsController(HRDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetByMajorCode")]
        public IActionResult GetByMajorCode([FromQuery] int MajorCode)
        {
            try
            {
                var data = from lookup in _dbContext.LookUps
                           where lookup.MajorCode == MajorCode && lookup.MinorCode != 0
                           select new ListDTO
                           {
                               Id = lookup.Id,
                               Name = lookup.Name
                           };
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400

            }
        }

    }
}