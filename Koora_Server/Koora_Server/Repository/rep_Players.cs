using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class rep_Players : IRepository<Players>
    {
        public rep_Players(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Players entity)
        {
            DbContext.Players.Add(entity);
            await Save();
        }

        public async Task Edit(Players entity)
        {
            DbContext.Players.Update(entity);
            await Save();
        }

        public async Task<Players> Find(int id)
        {
            var find = await DbContext.Players.SingleOrDefaultAsync(p => p.id == id);
            return find;
        }

        public async Task<IList<Players>> List()
        {
            return await DbContext.Players.Select(p => new Players {
                id = p.id,
                about = p.about,
                date_Nais = p.date_Nais,
                Firstname = p.Firstname,
                lastName = p.lastName,
                nationality = p.nationality,
                image = p.image,
                nombre = p.nombre,
                poste = p.poste,
                vote = p.vote,
                team = p.team
            }).ToListAsync();
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Players.Remove(find);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
