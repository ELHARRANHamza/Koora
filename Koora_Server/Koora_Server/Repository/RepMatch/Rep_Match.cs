using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepMatch
{
    public class Rep_Match : IMatch
    {
        public Rep_Match(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Match entity)
        {
            await DbContext.Matches.AddAsync(entity);
            await DbContext.SaveChangesAsync();
        }

        public async Task Edit(Match match)
        {
            DbContext.Matches.Update(match);
            await DbContext.SaveChangesAsync();
        }

      

        public async Task<Match> Find(int id)
        {
            if (id == 0)
                return null;
            var find = await DbContext.Matches.SingleOrDefaultAsync(m => m.id == id);
            return find;
        }

        public async Task<IList<Champions>> GetMatch(int etat)
        {
            var match = await DbContext.Champions.Select(c => new Champions
            {
                id = c.id,
                name = c.name,
                image = c.image,
                matches = c.matches.Select(m => new Match
                {
                    id = m.id,
                    res_TeamAller = m.res_TeamAller,
                    res_TeamRetour = m.res_TeamRetour,
                    etat = m.etat,
                    date_Match = m.date_Match,
                    team_Aller = m.team_Aller,
                    team_Retour = m.team_Retour,
                    stade = m.stade,
                    type = m.type,
                    match_TVs = m.match_TVs.Select(t => new Match_TV() { tv = t.tv}).ToList(),
                    goals = m.goals.Select(g => new Goal() { minute = g.minute,players =new Players()
                    {
                        lastName = g.players.lastName,
                        Firstname = g.players.Firstname,
                        image = g.players.image,
                        team = new Team() {id = g.players.team.id }
                    }
                    }).ToList()
                }).Where(m => m.etat == etat).OrderByDescending(m => m.date_Match).ToList()
            }).ToListAsync();
            return match;
        }

        public async Task<Champions> GetMatchChampion(int id,int etat)
        {
            var match = await DbContext.Champions.Select(c => new Champions
            {
                id = c.id,
                name = c.name,
                image = c.image,
                matches = c.matches.Select(m => new Match
                {
                    id = m.id,
                    res_TeamAller = m.res_TeamAller,
                    res_TeamRetour = m.res_TeamRetour,
                    etat = m.etat,
                    date_Match = m.date_Match,
                    team_Aller = m.team_Aller,
                    team_Retour = m.team_Retour,
                    stade = m.stade,
                    type = m.type
                }).Where(m => m.etat == etat).ToList()
            }).SingleOrDefaultAsync(c => c.id == id);
            return match;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Matches.Remove(find);
            await DbContext.SaveChangesAsync();
        }
    }
}
