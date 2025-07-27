using Microsoft.AspNetCore.Mvc;
using TaskManager.API.Data;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpGet("google")]
        public IActionResult GoogleLogin()
        {
            return Ok("Google OAuth endpoint - working!");
        }
    }
}
