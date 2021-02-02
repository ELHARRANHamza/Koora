using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class Rep_Categorie : IRepository<Categorie>
    {
        public Rep_Categorie(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Categorie entity)
        {
            await DbContext.Categories.AddAsync(entity);
            await Save();
        }

        public async Task Edit(Categorie categorie)
        {
            DbContext.Categories.Update(categorie);
            await Save();
        }

        public async Task<Categorie> Find(int id)
        {
            var find = await DbContext.Categories.SingleOrDefaultAsync(c => c.id == id);
            return find;
        }

        public async Task<IList<Categorie>> List()
        {
            var liste = await DbContext.Categories.ToListAsync();
            return liste;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Categories.Remove(find);
            await Save();
        }
        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
