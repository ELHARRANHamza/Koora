using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.gestionFile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ChampionsController : ControllerBase
    {
        public IRepository<Champions> Rep_Champions { get; }
        public IGestionFile GestionFile { get; }

        public ChampionsController(IRepository<Champions> rep_Champions,
          IGestionFile gestionFile)
        {
            GestionFile = gestionFile;
            Rep_Champions = rep_Champions;
        }
        // GET: api/Tv
        [HttpGet("GetAllChampions")]
        public async Task<IActionResult> GetAllChampions()
        {
            var list = await Rep_Champions.List();
            return Ok(list);
        }

        // POST: api/Tv
        [HttpPost("AddChampion")]
        public async Task<IActionResult> AddChampion([FromForm] ChampionsDto championsDto)
        {
            if (championsDto == null)
            {
                return BadRequest();
            }
            string fileName = await GestionFile.Add(championsDto.file, "ImageChampions");
            if (fileName == null)
            {
                return BadRequest();
            }
            var champions = new Champions()
            {
                image = fileName,
                name = championsDto.name
            };
            await Rep_Champions.Add(champions);
            return Ok();
        }

        // PUT: api/Tv/5
        [HttpPut("EditChampion/{id}")]
        public async Task<IActionResult> EditChampion(int id, [FromForm] ChampionsDto championsDto)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var find = await Rep_Champions.Find(id);
            string fileName = await GestionFile.Edit(championsDto.file, find.image, "ImageChampions");
            if (fileName != null)
            {
                find.image = fileName;
            }
            find.name = championsDto.name;
            await Rep_Champions.Edit(find);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("DeleteChampion/{id}")]
        public async Task<IActionResult> DeleteChampion(int id)
        {
            await Rep_Champions.Remove(id);
            return Ok();
        }
    }
}
