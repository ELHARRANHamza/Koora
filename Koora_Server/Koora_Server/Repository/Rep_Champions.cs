using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class Rep_Champions : IRepository<Champions>
    {
        public Rep_Champions(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Champions entity)
        {
            DbContext.Champions.Add(entity);
            await Save();
        }

        public async Task Edit(Champions entity)
        {
            DbContext.Champions.Update(entity);
            await Save();
        }

        public async Task<Champions> Find(int id)
        {
            var find = await DbContext.Champions.SingleOrDefaultAsync(c => c.id == id);
            return find;
        }

        public async Task<IList<Champions>> List()
        {
            var list = await DbContext.Champions.ToListAsync();
            return list;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Champions.Remove(find);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
