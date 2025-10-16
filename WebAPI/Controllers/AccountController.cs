using System.Security.Cryptography;
using System.Text;
using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly TokenService _tokenService;

        public AccountController(DataContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
            if (await EmailExists(registerDto.Useremail)) return BadRequest("Email is already registered");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToString(),
                UserEmail = registerDto.Useremail.ToString(),
                City = "Unknown",
                Country = "Unknown",
                Gender = "Not Specified",
                LookingFor = "Not Specified",
                Age = Random.Shared.Next(18, 80),
                DateOfBirth = DateTime.UtcNow.AddYears(-Random.Shared.Next(18, 80)),
                KnownAs = registerDto.Username.ToString(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Useremail = user.UserEmail,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
            //var email = await _context.Users.SingleOrDefaultAsync(x => x.UserEmail == loginDto.Useremail.ToLower());
            if (user == null) return Unauthorized("Invalid username");
            //if (email == null) return Unauthorized("Invalid email");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Useremail = user.UserEmail,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToString());
        }
        private async Task<bool> EmailExists(string useremail)
        {
            return await _context.Users.AnyAsync(x => x.UserEmail == useremail.ToString());
        }
    }

    public class UserDto
    {
        public required string Username { get; set; }

        public required string Useremail { get; set; }
        public required string Token { get; set; }
    }
}
