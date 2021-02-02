using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.LoadCombo;
using Koora_Server.Repository.RepMatch;
using Koora_Server.Repository.RepMatchTv;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MatchTvController : ControllerBase
    {
        public ILoadCombo LoadCombo { get; }
        public IMatchTv MatchTv { get; }
        public IRepository<Tv> Rep_Tv { get; }
        public IMatch Match { get; }

        public MatchTvController(ILoadCombo loadCombo,
            IMatchTv matchTv,
            IRepository<Tv> rep_Tv,
            IMatch match)
        {
            LoadCombo = loadCombo;
            MatchTv = matchTv;
            Rep_Tv = rep_Tv;
            Match = match;
        }
        [HttpGet("loadComboMatchTv")]
        public async Task<IActionResult> loadComboMatchTv()
        {
            var load = await LoadCombo.LoadComMatchTV();
            return Ok(load);
        }
        // GET: api/MatchTv
        [HttpGet("getMatchTv/{idMatch}")]
        public async Task<IActionResult> getMatchTv(int idMatch)
        {
            var list = await MatchTv.List(idMatch);
            return Ok(list);
        }

        // POST: api/MatchTv
        [HttpPost("postMatchTv")]
        public async Task<IActionResult> postMatchTv([FromBody]MatchTvDto matchTvDto)
        {
            try
            {
                if (matchTvDto == null)
                    return BadRequest();
                int id_Match = matchTvDto.id_match;
                int id_Tv = matchTvDto.id_tv;
                if (id_Match == 0 || id_Tv == 0)
                    return BadRequest();
                var find_Tv = await Rep_Tv.Find(id_Tv);
                var find_Match = await Match.Find(id_Match);
                if (find_Match == null || find_Tv == null)
                    return BadRequest();
                var matchTv = new Match_TV()
                {
                    match = find_Match,
                    tv = find_Tv
                };
                await MatchTv.Add(matchTv);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/MatchTv/5
        [HttpPut("putMatchTv/{id}")]
        public async Task<IActionResult> putMatchTv([FromBody]MatchTvDto matchTvDto,int id)
        {
            try
            {
                if (id == 0)
                    return BadRequest();
                if (matchTvDto == null)
                    return BadRequest();
                int id_Tv = matchTvDto.id_tv;
                if (id_Tv == 0)
                    return BadRequest();
                var find_Tv = await Rep_Tv.Find(id_Tv);
                if (find_Tv == null)
                    return BadRequest();
                var findmatchTv = await MatchTv.Find(id);
                findmatchTv.tv = find_Tv;
                await MatchTv.Edit(findmatchTv);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("deleteMatchTv/{id}")]
        public async Task<IActionResult> deleteMatchTv(int id)
        {
            if (id == 0)
                return BadRequest();
            await MatchTv.Remove(id);
            return Ok();
        }
    }
}
