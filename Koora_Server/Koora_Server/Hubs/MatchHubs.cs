using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Hubs
{
    public class MatchHubs: Hub
    {
        public MatchHubs(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }
        public async Task FinishMatch(int idChampion)
        {
            var listTeams = await DbContext.Champions.Select(c => new Champions()
            {
                id = c.id,
                name = c.name,
                image = c.image,
                teams = c.teams.Select(t => new CollectionTeam()
                {
                    id = t.id,
                    point = t.point,
                    team = t.team,
                    nbMatch = t.team.matches_Aller.Count() + t.team.matches_Retour.Count(),
                    nbMatchW = t.team.matches_Aller.Where(m => m.res_TeamAller < m.res_TeamRetour).Count() +
                           t.team.matches_Retour.Where(m => m.res_TeamAller > m.res_TeamRetour).Count(),
                    nbMatchL = t.team.matches_Aller.Where(m => m.res_TeamAller > m.res_TeamRetour).Count() +
                           t.team.matches_Retour.Where(m => m.res_TeamAller < m.res_TeamRetour).Count(),
                    nbMatchB = t.team.matches_Aller.Where(m => m.res_TeamAller == m.res_TeamRetour).Count() +
                           t.team.matches_Retour.Where(m => m.res_TeamAller == m.res_TeamRetour).Count()
                }).OrderByDescending(p => p.point).ToList()
            }).SingleOrDefaultAsync(ch => ch.id == idChampion);
            await Clients.All.SendAsync("getResultPoint", listTeams);
        }
    }
}
