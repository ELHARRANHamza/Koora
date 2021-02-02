using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository.RepositoryUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class UserController : ControllerBase
    {
        public IUser User { get; }
        public UserController(IUser user)
        {
            User = user;
        }
        // GET: api/User
        [HttpGet("userDto")]
        public async Task<IActionResult> Get()
        {
            return Ok(await User.GetUserDto());
        }
        [HttpGet("allUsers")]
        public async Task<List<AppUsers>> allUsers()
        {
            var users = await User.List();
            return users;
        }
        [HttpPost("AddUser")]
        public async Task Post([FromBody] AddUserDto userDto)
        {
            if (ModelState.IsValid)
            {
                if (userDto != null)
                {
                    await User.posteUser(userDto);
                }
            }
        }

        // PUT: api/User/5
        [HttpPut("editUser/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EditUserDto editUserDto)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            await User.Edit(editUserDto, id);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> deleteUser(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            if(await User.Find(id) == null)
            {
                return BadRequest();
            }
            await User.Delete(id);
            return Ok();
        }
    }
}
