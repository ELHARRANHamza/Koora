using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class rep_Teams : IRepository<Team>
    {
        public rep_Teams(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Team entity)
        {
            await DbContext.Teams.AddAsync(entity);
            await Save();
        }

        public async Task Edit(Team entity)
        {
            DbContext.Teams.Update(entity);
            await Save();
        }

        public async Task<Team> Find(int id)
        {
            return await DbContext.Teams.SingleOrDefaultAsync(t => t.id == id);
        }

        public async Task<IList<Team>> List()
        {
            var list_Teams = await DbContext.Teams.Select(t => new Team { 
            id = t.id,
            logo = t.logo,
            nom = t.nom,
            Categorie = t.Categorie,
            contry = t.contry
            }).ToListAsync();
            return list_Teams;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Teams.Remove(find);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
