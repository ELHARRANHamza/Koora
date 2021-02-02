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
    public class TvController : ControllerBase
    {
        public IRepository<Tv> Rep_Tv { get; }
        public IGestionFile GestionFile { get; }

        public TvController(IRepository<Tv> rep_Tv,
            IGestionFile gestionFile)
        {
            Rep_Tv = rep_Tv;
            GestionFile = gestionFile;
        }
        // GET: api/Tv
        [HttpGet("GetAllTv")]
        public async Task<IActionResult> GetAllTv()
        {
            var list_Tv = await Rep_Tv.List();
            return Ok(list_Tv);
        }

        // POST: api/Tv
        [HttpPost("AddTv")]
        public async Task<IActionResult> AddTv([FromForm] TvDto tvDto)
        {
            if(tvDto == null)
            {
                return BadRequest();
            }
            string fileName = await GestionFile.Add(tvDto.file, "ImageTv");
            if (fileName == null)
            {
                return BadRequest();
            }
            var tv = new Tv()
            {
                logo = fileName,
                nom = tvDto.nom
            };
            await Rep_Tv.Add(tv);
            return Ok();
        }

        // PUT: api/Tv/5
        [HttpPut("EditTv/{id}")]
        public async Task<IActionResult> EditTv(int id, [FromForm] TvDto tvDto)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var find = await Rep_Tv.Find(id);
            string fileName = await GestionFile.Edit(tvDto.file, find.logo, "ImageTv");
            if (fileName != null)
            {
                find.logo = fileName;
            }
            find.nom = tvDto.nom;
            await Rep_Tv.Edit(find);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("DeleteTv/{id}")]
        public async Task<IActionResult> DeleteTv(int id)
        {
            await Rep_Tv.Remove(id);
            return Ok();
        }
    }
}
