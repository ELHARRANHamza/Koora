using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepPlayers
{
    public class Rep_Players : IRepPlayers
    {
       
        public Rep_Players(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }


        public async Task<IList<Players>> BestPlayers()
        {
            var players = await DbContext.Players.Take(4).OrderByDescending(p => p.goals.Count).ToListAsync();
            return players;
        }

        public async Task<IList<Players>> GetPlayers(int id)
        {
            var teams = await DbContext.Teams.SingleOrDefaultAsync(t => t.id == id);
             var players = await DbContext.Players.Select(p => new Players
             {
                 id = p.id,
                 about = p.about,
                 date_Nais = p.date_Nais,
                 Firstname = p.Firstname,
                 lastName = p.lastName,
                 nationality = p.nationality,
                 image = p.image,
                 nombre = p.nombre,
                 poste = p.poste,
                 vote = p.vote,
                 team = p.team
             }).Where(p => p.team == teams).ToListAsync();
            return players;
        }
    }
}
