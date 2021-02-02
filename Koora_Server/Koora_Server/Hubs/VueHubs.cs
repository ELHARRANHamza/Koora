using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Hubs
{
    public class VueHubs:Hub
    {
        public VueHubs(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task vue(int id)
        {
            var find = await DbContext.Messages.SingleOrDefaultAsync(m => m.id == id);
            find.etat = 1;
            DbContext.Messages.Update(find);
            await DbContext.SaveChangesAsync();
            await Clients.All.SendAsync("result", find);
        }
    }
}
