using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class Rep_Tv : IRepository<Tv>
    {
        public Rep_Tv(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Tv entity)
        {
            await DbContext.Tvs.AddAsync(entity);
            await Save();
        }

        public async Task Edit(Tv entity)
        {
            DbContext.Tvs.Update(entity);
            await Save();
        }

        public async Task<Tv> Find(int id)
        {
          var find = await DbContext.Tvs.SingleOrDefaultAsync(tv => tv.id == id);
            return find;
        }

        public async Task<IList<Tv>> List()
        {
            var liste = await DbContext.Tvs.ToListAsync();
            return liste;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Tvs.Remove(find);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
