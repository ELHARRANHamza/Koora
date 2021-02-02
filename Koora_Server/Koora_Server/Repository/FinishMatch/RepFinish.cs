using Koora_Server.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.FinishMatch
{
    public class RepFinish : IRepFinishMatch
    {
        public RepFinish(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task FinishMatch(FinishDTO finishDTO)
        {
            int pointTeamAller = 0,
               pointTeamRetour = 0;
            var findMatch = await DbContext.Matches.SingleOrDefaultAsync(m => m.id == finishDTO.idMatch);
            var findChampion = await DbContext.Champions.SingleOrDefaultAsync(c => c.id == finishDTO.idChampion);
            var findTeamAller = await DbContext.Teams.SingleOrDefaultAsync(t => t.id == finishDTO.idTeamsAller);
            var findTeamRetour = await DbContext.Teams.SingleOrDefaultAsync(t => t.id == finishDTO.idTeamsRetour);
            var findCollTeamAller = await DbContext.collectionTeams.SingleOrDefaultAsync(m => m.champions == findChampion && m.team == findTeamAller);
            var findCollTeamRetour = await DbContext.collectionTeams.SingleOrDefaultAsync(m => m.champions == findChampion && m.team == findTeamRetour);
            int restTeamAller = findMatch.res_TeamAller;
            int resTeamRetour = findMatch.res_TeamRetour;
            if (restTeamAller > resTeamRetour)
            {
                pointTeamAller = 3;
                pointTeamRetour = 0;
            }
            else if (resTeamRetour > restTeamAller)
            {
                pointTeamAller = 0;
                pointTeamRetour = 3;
            }
            else
            {
                pointTeamAller = 1;
                pointTeamRetour = 1;
            }
            findCollTeamAller.point += pointTeamAller;
            findCollTeamRetour.point += pointTeamRetour;
            DbContext.collectionTeams.Update(findCollTeamAller);
            DbContext.collectionTeams.Update(findCollTeamRetour);
            await DbContext.SaveChangesAsync();
        }
    }
}
