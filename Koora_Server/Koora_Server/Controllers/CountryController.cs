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
    public class CountryController : ControllerBase
    {
        public IRepository<Contry> Rep_Contry { get; }
        public IGestionFile GestionFile { get; }

        public CountryController(IRepository<Contry> rep_Contry,
            IGestionFile gestionFile)
        {
            Rep_Contry = rep_Contry;
            GestionFile = gestionFile;
        }
        // GET: api/Country
        [HttpGet("getAllContry")]
        public async Task<IActionResult> getAllContry()
        {
           var liste = await Rep_Contry.List();
            return Ok(liste);
        }

        // GET: api/Country/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok();
        }

        // POST: api/Country
        [HttpPost("AddCountry")]
        public async Task<IActionResult> AddCountry([FromForm] CountryDto countryDto)
        {
            if(countryDto == null)
            {
                return BadRequest();
            }
            string fileName = await GestionFile.Add(countryDto.file, "ImageCountry");
            if(fileName == null)
            {
                return BadRequest();
            }
            var contry = new Contry()
            {
                name = countryDto.name,
                image = fileName
            };
            await Rep_Contry.Add(contry);
            return Ok();
        }

        // PUT: api/Country/5
        [HttpPut("EditCountry/{id}")]
        public async Task<IActionResult> EditCountry(int id, [FromForm] CountryDto countryDto)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            var find = await Rep_Contry.Find(id);
            string fileName = await GestionFile.Edit(countryDto.file, find.image, "ImageCountry");
            if (fileName != null)
            {
                find.image = fileName;
            }
            find.name = countryDto.name;
            await Rep_Contry.Edit(find);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("DeleteCountry/{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            await Rep_Contry.Remove(id);
            return Ok();
        }
    }
}
