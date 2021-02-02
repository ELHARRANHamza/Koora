using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.Cmt;
using Koora_Server.Repository.Home;
using Koora_Server.Repository.RepPlayers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public IHome Repository { get; }
        public IRepCommentaire RepCommentaire { get; }
        public IRepPlayers RepPlayers { get; }

        public HomeController(IHome repository,
            IRepCommentaire repCommentaire,
            IRepPlayers repPlayers)
        {
            Repository = repository;
            RepCommentaire = repCommentaire;
            RepPlayers = repPlayers;
        }
        // GET: api/Home
        [HttpGet("Home")]
        public async Task<IActionResult> Get()
        {
            var news = await Repository.Home();
            return Ok(news);
        }
        [Authorize]
        [HttpGet("getCommentaire/{id}")]
        public async Task<IActionResult> getCommentaire(int id)
        {
            var commentaires = await RepCommentaire.getCommentaires(id);
            return Ok(commentaires);
        }
        // GET: api/Home
        [HttpGet("Blog")]
        public async Task<IActionResult> Blog()
        {
            var blog = await Repository.Blog();
            return Ok(blog);
        }

        // GET: api/Home/5
        [Authorize]
        [HttpGet("Details/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            var find = await Repository.Details(id);
            if(find == null)
            {
                return NoContent();
            }
            return Ok(find);
        }
        [HttpGet("BestPlayers")]
        public async Task<IActionResult> BestPlayers()
        {
            var players = await RepPlayers.BestPlayers();
            return Ok(players);
        }
    }
}
