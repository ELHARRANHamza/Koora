using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository.RepMatch;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Hubs
{
    public class GoalHubs: Hub
    {
        private readonly IMatch match;

        public GoalHubs(IMatch match,
            ApplicationDbContext dbContext)
        {
            this.match = match;
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Goal(int idMatch,int id_TeamAller)
        {
            var find_Match = await DbContext.Matches.SingleOrDefaultAsync(m =>m.id == idMatch);
            if (id_TeamAller != 0)
            {
                find_Match.res_TeamAller += 1;
            }
            else
            {
                find_Match.res_TeamRetour += 1;
            }
            await match.Edit(find_Match);
            await Clients.All.SendAsync("result",find_Match);
        }
    }
}
