using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.LoadCombo
{
    public class LoadCombo : ILoadCombo
    {
        public LoadCombo(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task<IList<Contry>> GetContries()
        {
            var listContry = await DbContext.Contry.Select(c => new Contry()
            {
                id = c.id,
                image = c.image,
                name = c.name,
                teams = c.teams.Select(t => new Team()
                {
                    id = t.id,
                    nom = t.nom,
                    logo = t.logo,
                    Categorie = t.Categorie
                }).ToList()
            }).ToListAsync();
            return listContry;
        }

        public async Task<IList<Team>> LoadChampionTeams(int id)
        {
            var findCountry = await DbContext.Contry.SingleOrDefaultAsync(c => c.id == id);
            var listTeams = await DbContext.Teams.Select(t => new Team() {
            id = t.id,
            nom = t.nom,
            contry = t.contry
            }).Where(t => t.contry == findCountry).ToListAsync();
            return listTeams;
        }

        public async Task<LoadTeamsDto> LoadComboTeams()
        {
            var listCat = await DbContext.Categories.ToListAsync();
            var listContry = await DbContext.Contry.ToListAsync();
            var load = new LoadTeamsDto()
            {
                Categories = listCat,
                Contries = listContry
            };
            return load;
        }

        public async Task<LoadComMatch> LoadComMatch()
        {
            var listTeam = await DbContext.Teams.ToListAsync();
            var list_Champions = await DbContext.Champions.ToListAsync();
            var load = new LoadComMatch()
            {
                teams = listTeam,
                champions = list_Champions
            };
            return load;
        }

        public async Task<IList<Tv>> LoadComMatchTV()
        {
            var tv = await DbContext.Tvs.ToListAsync();
            return tv;
        }

        public async Task<IList<Players>> LoadComPlayers(int idTeams)
        {
            var findTeams = await DbContext.Teams.SingleOrDefaultAsync(t => t.id == idTeams);
            var listPlayers = await DbContext.Players.Select(p =>new Players {
                id = p.id,
                nombre = p.nombre,
                Firstname = p.Firstname,
                lastName = p.lastName,
                team = p.team
            }).Where(p =>p.team == findTeams)
            .ToListAsync();
            return listPlayers;
        }
    }
}
