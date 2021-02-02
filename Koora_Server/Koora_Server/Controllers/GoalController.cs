using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.RepGoal;
using Koora_Server.Repository.RepMatch;
using Koora_Server.Repository.RepPlayers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        public GoalController(IRepGoal repGoal,
            IMatch match,
            IRepository<Players> rep_Players)
        {
            RepGoal = repGoal;
            Match = match;
            Rep_Players = rep_Players;
        }

        public IRepGoal RepGoal { get; }
        public IMatch Match { get; }
        public IRepository<Players> Rep_Players { get; }

        [HttpPost("posteGoal")]
        public async Task<IActionResult> posteGoal([FromBody] GoalDto goalDto)
        {
            try
            {
                if (goalDto == null)
                    return BadRequest();
                var findPlayers = await Rep_Players.Find(goalDto.idPlayers);
                var find_Match = await Match.Find(goalDto.idMatch);
                if (findPlayers == null || find_Match == null)
                    return BadRequest();
                var goal = new Goal()
                {
                    match = find_Match,
                    players = findPlayers,
                    minute = goalDto.minute
                };
                await RepGoal.Add(goal);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}