using HR.DTOs.Auth;
using HR.DTOs.LogIn;
using HR.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Unicode;

namespace HR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private HRDbContext _dbContext;
        public AuthController(HRDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("Login")]
        public IActionResult LogIn([FromBody] LogInDto loginDto)
        {
            try
            {
                var user = _dbContext.Users.FirstOrDefault(x => x.UserName.ToLower() == loginDto.UserName.ToLower());

                // Check if user exists
                if (user == null)
                    return BadRequest("Invalid UserName or Password");

                // Check if password matches
                if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.HashedPassword))
                    return BadRequest("Invalid UserName or Password");

                var token = GenerateJwtToken(user);

                return Ok(token); // the token is in the form of JSON object with a property named "token" and its value is the generated token
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // 400
            }
        }

        private TokenDto GenerateJwtToken(User user)
        {
            string role;
            var claims = new List<Claim>(); // User Info, and its key-value pairs

            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));

            if (user.IsAdmin)
                { 
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
                role = "Admin";
            }
            else
            {
                var employee = _dbContext.Employees.Include(x => x.LookUp).FirstOrDefault(x => x.UserId == user.Id);
                claims.Add(new Claim(ClaimTypes.Role, employee.LookUp.Name));
                role = employee.LookUp.Name;
            }

            var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WHAFWEI#!@S!!112312WQEQW@RWQEQW432"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenSettings = new JwtSecurityToken(
                claims: claims, // Uer Info, and its key-value pairs
                expires: DateTime.Now.AddDays(1), // Token Expiration Date
                signingCredentials: creds // Encryption Settings
                );

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenSettings);


            return new TokenDto { Token = token, Role = role }; 
        }
    }
}
