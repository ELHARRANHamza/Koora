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
    public class CategorieController : ControllerBase
    {
        public IRepository<Categorie> Rep_Cat { get; }

        public CategorieController(IRepository<Categorie> rep_Cat)
        {
            Rep_Cat = rep_Cat;
        }
        // GET: api/Categorie
        [HttpGet("liste")]
        public async Task<IActionResult> list_Cat()
        {
            var liste_Cat = await Rep_Cat.List();
            return Ok(liste_Cat);
        }

        // GET: api/Categorie/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> details(int id)
        {
           if(id == null)
            {
                return BadRequest();
            }
            var find = await Rep_Cat.Find(id);
            return Ok(find);
        }

        // POST: api/Categorie
        [HttpPost("add")]
        public async Task<IActionResult> Post([FromBody] Categorie categorie)
        {
            if(categorie == null)
            {
                return BadRequest();
            }
            await Rep_Cat.Add(categorie);
            return Ok();
        }

        // PUT: api/Categorie/5
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Put(int id,Categorie categorie)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var find = await Rep_Cat.Find(id);
            if(find == null)
            {
                return BadRequest();
            }
            find.cat_Nom = categorie.cat_Nom;
            await Rep_Cat.Edit(find);
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
            await Rep_Cat.Remove(id);
            return Ok();
        }
    }
}
