using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.CollectionTeams;
using Koora_Server.Repository.FinishMatch;
using Koora_Server.Repository.LoadCombo;
using Koora_Server.Repository.RepMatch;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        public IMatch Match { get; }
        public IRepository<Team> RepTeam { get; }
        public IRepository<Champions> RepChampion { get; }
        public ILoadCombo LoadCombo { get; }
        public ICollectionTeams CollectionTeams { get; }
        public IRepFinishMatch FinishMatch1 { get; }

        public MatchController(IMatch match,
            IRepository<Team> repTeam,
            IRepository<Champions> repChampion,
            ILoadCombo loadCombo,
            ICollectionTeams collectionTeams,
            IRepFinishMatch finishMatch)
        {
            Match = match;
            RepTeam = repTeam;
            RepChampion = repChampion;
            LoadCombo = loadCombo;
            CollectionTeams = collectionTeams;
            FinishMatch1 = finishMatch;
        }
        // GET: api/Match
        [HttpGet("getMatchNotPlay/{id}")]
        public async Task<IActionResult> getMatchNotPlay(int id)
        {
            var listMatch = await Match.GetMatchChampion(id,0);
            return Ok(listMatch);
        }

        // GET: api/Match
        [HttpGet("getMatchPlay/{id}")]
        public async Task<IActionResult> getMatchPlay(int id)
        {
            var listMatch = await Match.GetMatchChampion(id,1);
            return Ok(listMatch);
        }
        // GET: api/Match
        [HttpGet("getMatchFinish/{id}")]
        public async Task<IActionResult> getMatchFinish(int id)
        {
            var listMatch = await Match.GetMatchChampion(id, 2);
            return Ok(listMatch);
        }
        [HttpGet("loadCombo/{id_Ch}")]
        public async Task<IActionResult> loadCombo(int id_Ch)
        {
            var load = await CollectionTeams.List(id_Ch);
            return Ok(load);
        }
        // POST: api/Match
        [HttpPost("addMatch")]
        public async Task<IActionResult> addMatch([FromBody] MatchDto matchDto)
        {
            try
            {
                if (matchDto == null)
                    return BadRequest();
                int id_Champion = matchDto.id_champions;
                int id_TeamAller = matchDto.id_team_Aller;
                int id_TeamRetour = matchDto.id_team_Retour;
                if (id_Champion == 0 || id_TeamAller == 0 || id_TeamRetour == 0)
                    return BadRequest();

                var findChampion = await RepChampion.Find(id_Champion);
                var findTeamAller = await RepTeam.Find(id_TeamAller);
                var findTeamRetour = await RepTeam.Find(id_TeamRetour);
                if (findChampion == null || findTeamAller == null || findTeamRetour == null)
                    return BadRequest();
                var match = new Match()
                {
                    date_Match = matchDto.date_Match,
                    team_Aller = findTeamAller,
                    team_Retour = findTeamRetour,
                    champions = findChampion,
                    stade = matchDto.stade,
                    etat = 0,
                    type = matchDto.type
                };
                await Match.Add(match);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Match/5
        [HttpPut("EditMatch/{id}")]
        public async Task<IActionResult> EditMatch(int id, [FromBody] MatchDto matchDto)
        {
            try
            {
                if (id == 0)
                return BadRequest();
            var findMatch = await Match.Find(id);
            if (findMatch == null)
                return BadRequest();
            int id_Champion = matchDto.id_champions;
            int id_TeamAller = matchDto.id_team_Aller;
            int id_TeamRetour = matchDto.id_team_Retour;
            if (id_Champion == 0 || id_TeamAller == 0 || id_TeamRetour == 0)
                return BadRequest();

            var findTeamAller = await RepTeam.Find(id_TeamAller);
            var findTeamRetour = await RepTeam.Find(id_TeamRetour);
            if (findTeamAller == null || findTeamRetour == null)
                return BadRequest();
            findMatch.date_Match = matchDto.date_Match;
            findMatch.team_Aller = findTeamAller;
            findMatch.team_Retour = findTeamRetour;
            findMatch.stade = matchDto.stade;
            findMatch.etat = 0;
            findMatch.type = matchDto.type;
            await Match.Edit(findMatch);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("DeleteMatch/{id}")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            if (id == 0)
                return BadRequest();
            await Match.Remove(id);
            return Ok();
        }
        [HttpPatch("StartMatch/{id}")]
        public async Task<IActionResult> StartMatch(int id)
        {
            if (id == 0)
                return BadRequest();
            await editEtatMatch(id, 1);
            return Ok();
        }
        [HttpPut("FinishMatch")]
        public async Task<IActionResult> FinishMatch([FromBody] FinishDTO finish)
        {
            if (finish == null)
                return BadRequest();
            if (finish.idChampion == 0 ||
                finish.idMatch == 0 ||
                finish.idTeamsAller == 0 ||
                finish.idTeamsRetour == 0)
                return BadRequest();
            await FinishMatch1.FinishMatch(finish);
            await editEtatMatch(finish.idMatch, 2);
            return Ok();
        }
        public async Task editEtatMatch(int id,int etat)
        {
            var find = await Match.Find(id);
            find.etat = etat;
            await Match.Edit(find);
        }
        [HttpGet("loadComboPlayers/{id}")]
        public async Task<IActionResult> loadComboPlayers(int id)
        {
            var combo = await LoadCombo.LoadComPlayers(id);
            return Ok(combo);
        }
        [HttpGet("affichageMatchNotPlay")]
        public async Task<IActionResult> affichageMatchNotPlay()
        {
            var listMatch = await Match.GetMatch(0);
            return Ok(listMatch);
        }

        // GET: api/Match
        [HttpGet("AffichageMatchPlay")]
        public async Task<IActionResult> AffichageMatchPlay()
        {
            var listMatch = await Match.GetMatch(1);
            return Ok(listMatch);
        }
        // GET: api/Match
        [HttpGet("AffichageMatchFinish")]
        public async Task<IActionResult> AffichageMatchFinish(int id)
        {
            var listMatch = await Match.GetMatch(2);
            return Ok(listMatch);
        }
    }
}