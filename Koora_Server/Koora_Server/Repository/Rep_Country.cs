using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class Rep_Country : IRepository<Contry>
    {
        public Rep_Country(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Contry entity)
        {
            await DbContext.Contry.AddAsync(entity);
            await Save();
        }

        public async Task Edit(Contry entity)
        {
            DbContext.Contry.Update(entity);
            await Save();
        }

        public async Task<Contry> Find(int id)
        {
            var find = await DbContext.Contry.SingleOrDefaultAsync(c => c.id == id);
            return find;
        }

        public async Task<IList<Contry>> List()
        {
            var listContry = await DbContext.Contry.ToListAsync();
            return listContry;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Contry.Remove(find);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
