using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class Rep_Roles : IRepository<Roles>
    {
        public Rep_Roles(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Roles entity)
        {
            await DbContext.Roles.AddAsync(entity);
            await Save();
        }

        public async Task Edit(Roles roles)
        {
            DbContext.Roles.Update(roles);
            await Save();
        }

        public async Task<Roles> Find(int id)
        {
            var find = await DbContext.Roles.SingleOrDefaultAsync(r => r.id == id);
            return find;
        }

        public async Task<IList<Roles>> List()
        {
            var liste = await DbContext.Roles.ToListAsync();
            return liste;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Roles.Remove(find);
            await Save();
        }
        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}