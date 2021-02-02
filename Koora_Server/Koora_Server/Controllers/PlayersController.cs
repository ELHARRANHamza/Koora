using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.gestionFile;
using Koora_Server.Repository.RepPlayers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class PlayersController : ControllerBase
    {
        public IRepository<Players> Rep_Players { get; }
        public IRepository<Team> Rep_Teams { get; }
        public IGestionFile GestionFile { get; }
        public IRepPlayers RepPlayers { get; }

        public PlayersController(IRepository<Players> rep_Players,
            IRepository<Team> rep_Teams,
            IGestionFile gestionFile,
            IRepPlayers repPlayers)
        {
            Rep_Players = rep_Players;
            Rep_Teams = rep_Teams;
            GestionFile = gestionFile;
            RepPlayers = repPlayers;
        }
        // GET: api/Teams
        [HttpGet("getAllPlayers/{id}")]
        public async Task<IActionResult> getAllPlayers(int id)
        {
            var listPlayers = await RepPlayers.GetPlayers(id);
            //var listPlayers = await Rep_Players.List();
            return Ok(listPlayers);
        }

        // POST: api/Teams
        [HttpPost("AddPlayers")]
        public async Task<IActionResult> AddPlayers([FromForm] PlayersDto playersDto)
        {
            if (playersDto == null)
            {
                return BadRequest();
            }
            var find_Teams = await Rep_Teams.Find(playersDto.id_team);
            if (find_Teams == null)
            {
                return BadRequest();
            }
            string fileName = await GestionFile.Add(playersDto.file, "ImagePlayers");
            if (fileName == null)
            {
                return BadRequest();
            }
            var players = new Players()
            {
                Firstname = playersDto.Firstname,
                lastName = playersDto.lastName,
                about = playersDto.about,
                date_Nais = playersDto.date_Nais,
                image = fileName,
                nationality = playersDto.nationality,
                nombre = playersDto.nombre,
                vote = playersDto.vote,
                poste = playersDto.poste,
                team = find_Teams
            };
            await Rep_Players.Add(players);
            return Ok();
        }

        // PUT: api/Teams/5
        [HttpPut("EditPlayers/{id}")]
        public async Task<IActionResult> EditPlayers(int id, [FromForm] PlayersDto playersDto)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var find = await Rep_Players.Find(id);
            if (find == null)
            {
                return BadRequest();
            }
            var find_Teams = await Rep_Teams.Find(playersDto.id_team);
            if (find_Teams == null)
            {
                return BadRequest();
            }
            string fileName = await GestionFile.Add(playersDto.file, "ImagePlayers");
            if (fileName != null)
            {
                find.image = fileName;
            }

            find.Firstname = playersDto.Firstname;
            find.lastName = playersDto.lastName;
            find.about = playersDto.about;
            find.date_Nais = playersDto.date_Nais;
            find.image = fileName;
            find.nationality = playersDto.nationality;
            find.nombre = playersDto.nombre;
            find.vote = playersDto.vote;
            find.poste = playersDto.poste;
            find.team = find_Teams;
            await Rep_Players.Edit(find);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("DeletePlayers/{id}")]
        public async Task<IActionResult> DeletePlayers(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            await Rep_Players.Remove(id);
            return Ok();
        }
    }
}
