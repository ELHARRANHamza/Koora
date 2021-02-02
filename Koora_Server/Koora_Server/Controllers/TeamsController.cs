using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.gestionFile;
using Koora_Server.Repository.LoadCombo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class TeamsController : ControllerBase
    {
        public IRepository<Team> Rep_Team { get; }
        public IRepository<Categorie> Rep_Cat { get; }
        public IRepository<Contry> Rep_Contry { get; }
        public IGestionFile GestionFile { get; }
        public ILoadCombo LoadCombo { get; }

        public TeamsController(IRepository<Team> rep_Team,
            IRepository<Categorie> rep_Cat,
            IRepository<Contry> rep_Contry,
            IGestionFile gestionFile,
            ILoadCombo loadCombo)
        {
            Rep_Team = rep_Team;
            Rep_Cat = rep_Cat;
            Rep_Contry = rep_Contry;
            GestionFile = gestionFile;
            LoadCombo = loadCombo;
        }
        [HttpGet("laodData")]
        public async Task<IActionResult> laodData()
        {
            var load = await LoadCombo.LoadComboTeams();
            return Ok(load);
        }
        // GET: api/Teams
        [HttpGet("getAllTeams")]
        [AllowAnonymous]
        public async Task<IActionResult> getAllTeams()
        {
            var listTeams = await LoadCombo.GetContries();
            return Ok(listTeams);
        }

        // POST: api/Teams
        [HttpPost("AddTeams")]
        public async Task<IActionResult> Post([FromForm] TeamsDto teamsDto)
        {
            if(teamsDto == null)
            {
                return BadRequest();
            }
            var find_Cat = await Rep_Cat.Find(teamsDto.id_Cat);
            var find_Country = await Rep_Contry.Find(teamsDto.id_Country);
            if (find_Cat == null || find_Country == null)
            {
                return BadRequest();
            }
            string fileName = await GestionFile.Add(teamsDto.file, "ImageTeams");
            if (fileName == null)
            {
                return BadRequest();
            }
            var teams = new Team()
            {
                nom = teamsDto.nom,
                logo = fileName,
                Categorie = find_Cat,
                contry = find_Country
            };
            await Rep_Team.Add(teams);
            return Ok();
        }

        // PUT: api/Teams/5
        [HttpPut("EditTeams/{id}")]
        public async Task<IActionResult> EditTeams(int id, [FromForm] TeamsDto teams)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var find = await Rep_Team.Find(id);
            if(find == null)
            {
                return BadRequest();
            }
            var findCat = await Rep_Cat.Find(teams.id_Cat);
            var findCountry = await Rep_Contry.Find(teams.id_Country);
            if (findCat == null || findCountry == null)
            {
                return BadRequest();
            }
                string fileName = await GestionFile.Edit(teams.file, find.logo, "ImageTeams");
            if (fileName != null)
            {
                find.logo = fileName;
            }
            
            find.nom = teams.nom;
            find.Categorie = findCat;
            find.contry = findCountry;
            await Rep_Team.Edit(find);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("DeleteTeams/{id}")]
        public async Task<IActionResult> DeleteTeams(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            await Rep_Team.Remove(id);
            return Ok();
        }
    }
}
