using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class rep_Commentaire : IRepository<Commentaire>
    {
        public rep_Commentaire(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Commentaire entity)
        {
            await DbContext.Commentaires.AddAsync(entity);
            await Save();
        }

        public Task Edit(Commentaire entity)
        {
            throw new NotImplementedException();
        }

        public async Task<Commentaire> Find(int id)
        {
            var find = await DbContext.Commentaires.SingleOrDefaultAsync(c => c.id == id);
            return find;
        }

        public Task<IList<Commentaire>> List()
        {
            throw new NotImplementedException();
        }

        public Task Remove(int id)
        {
            throw new NotImplementedException();
        }
        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
