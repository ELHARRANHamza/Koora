using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.CollectionTeams;
using Koora_Server.Repository.LoadCombo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CollectionTeamsController : ControllerBase
    {
        public ICollectionTeams Rep_ColTeams { get; }
        public IRepository<Champions> Rep_Champion { get; }
        public IRepository<Team> Rep_Teams { get; }
        public ILoadCombo LoadCombo { get; }

        public CollectionTeamsController(ICollectionTeams rep_ColTeams,
                                         IRepository<Champions> rep_Champion,
                                         IRepository<Team> rep_Teams,
                                         ILoadCombo loadCombo)
        {
            Rep_ColTeams = rep_ColTeams;
            Rep_Champion = rep_Champion;
            Rep_Teams = rep_Teams;
            LoadCombo = loadCombo;
        }
        // GET: api/CollecctionTeams/id_Country
        [HttpGet("LoadComboTeamChampion/{id_Country}")]
        public async Task<IActionResult> LoadComboTeamChampion(int id_Country)
        {
            return Ok(await LoadCombo.LoadChampionTeams(id_Country));
        }
        // GET: api/CollecctionTeams/id_Champion
        [HttpGet("GetCollectionTeams/{id_Champion}")]
        public async Task<IActionResult> GetCollectionTeams(int id_Champion)
        {
            if (id_Champion == 0)
                return BadRequest();
            var listTeams = await Rep_ColTeams.List(id_Champion);
            return Ok(listTeams);
        }
        // POST: api/CollecctionTeams
        [HttpPost("AddCollectionTeams")]
        public async Task <IActionResult>AddCollectionTeams([FromBody] ChampionTeamsDto championTeamsDto)
        {
            try
            {
                int id_Teams = championTeamsDto.id_Teams,
                    id_Champion = championTeamsDto.id_Champion;
                if (id_Champion == 0 || id_Teams == 0)
                    return BadRequest();
                var find_Teams = await Rep_Teams.Find(id_Teams);
                var find_Champion = await Rep_Champion.Find(id_Champion) ;
                if (find_Champion == null || find_Teams == null)
                    return BadRequest();
                var championTeam = new CollectionTeam()
                {
                    champions = find_Champion,
                    team = find_Teams
                };
                await Rep_ColTeams.Add(championTeam);
                return Ok();
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        // DELETE: api/ApiWithActions/5
        [HttpDelete("DeleteCollectionTeams/{id}")]
        public async Task<IActionResult> DeleteCollectionTeams(int id)
        {
            if (id == 0)
                return BadRequest();
           await Rep_ColTeams.Remove(id);
            return Ok();
        }

        [HttpGet("GetCollectionTeamsPoint")]
        public async Task<IActionResult> GetCollectionTeamsPoint()
        {
            var listTeams = await Rep_ColTeams.PointTeams();
            return Ok(listTeams);
        }
    }
}
