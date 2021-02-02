using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepGoal
{
    public class RepGoal : IRepGoal
    {
        public RepGoal(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Goal goal)
        {
            await DbContext.Goals.AddAsync(goal);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
