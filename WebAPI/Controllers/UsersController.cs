using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        // Proper constructor
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // GET: api/users/3
        [HttpGet("{id:int}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<AppUser>> CreateUser(AppUser user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Returns 201 Created with URL of new resource
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/3
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateUser(int id, AppUser user)
        {
            if (id != user.Id)
                return BadRequest();

            _context.Entry(user).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/users/3
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Helper
        private bool UserExists(int id) => _context.Users.Any(u => u.Id == id);
    }
}
