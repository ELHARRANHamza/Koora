using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Models;
using Koora_Server.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class RolesController : ControllerBase
    {
        public IRepository<Roles> Rep_Roles { get; }

        public RolesController(IRepository<Roles> rep_Roles)
        {
            Rep_Roles = rep_Roles;
        }
        // GET: api/Categorie
        [HttpGet("liste")]
        public async Task<IActionResult> list_Roles()
        {
            var liste_Cat = await Rep_Roles.List();
            return Ok(liste_Cat);
        }

        // GET: api/Categorie/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> details(int id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var find = await Rep_Roles.Find(id);
            return Ok(find);
        }

        // POST: api/Categorie
        [HttpPost("add")]
        public async Task<IActionResult> Post([FromBody] Roles roles)
        {
            if (roles == null)
            {
                return BadRequest();
            }
            await Rep_Roles.Add(roles);
            return Ok();
        }

        // PUT: api/Categorie/5
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Put(int id, Roles roles)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var find = await Rep_Roles.Find(id);
            if (find == null)
            {
                return BadRequest();
            }
            find.roleName = roles.roleName;
            await Rep_Roles.Edit(find);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            await Rep_Roles.Remove(id);
            return Ok();
        }
    }
}