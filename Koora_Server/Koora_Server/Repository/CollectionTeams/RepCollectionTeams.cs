using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.CollectionTeams
{
    public class RepCollectionTeams : ICollectionTeams
    {
        public RepCollectionTeams(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(CollectionTeam entity)
        {
            await DbContext.collectionTeams.AddAsync(entity);
            await Save();
        }

        public async Task Edit(CollectionTeam entity)
        {
            DbContext.collectionTeams.Update(entity);
            await Save();
        }

        public async Task<CollectionTeam> Find(int id)
        {
            var find = await DbContext.collectionTeams.SingleOrDefaultAsync(c => c.id == id);
            return find;
        }

        public async Task<IList<CollectionTeam>> List(int id_Champion)
        {
            var findChampion = await DbContext.Champions.SingleOrDefaultAsync(c => c.id == id_Champion);
            var listCollectionTeam = await DbContext.collectionTeams.Select(c => new CollectionTeam() { 
                id = c.id,
                point = c.point,
                champions = c.champions,
                team = c.team
            }).Where(c => c.champions == findChampion).ToListAsync();
            return listCollectionTeam;
        }

        public async Task<IList<Champions>> PointTeams()
        {
            var listTeams = await DbContext.Champions.Select(c => new Champions() {
            id= c.id,
            name = c.name,
            image = c.image,
            teams = c.teams.Select(t => new CollectionTeam()
            {
                id = t.id,
                point = t.point,
                team = t.team,
                nbMatch = t.team.matches_Aller.Count()+t.team.matches_Retour.Count(),
                nbMatchW = t.team.matches_Aller.Where(m => m.res_TeamAller < m.res_TeamRetour).Count() +
                           t.team.matches_Retour.Where(m => m.res_TeamAller > m.res_TeamRetour).Count(),
                nbMatchL = t.team.matches_Aller.Where(m => m.res_TeamAller > m.res_TeamRetour).Count() +
                           t.team.matches_Retour.Where(m => m.res_TeamAller < m.res_TeamRetour).Count(),
                nbMatchB = t.team.matches_Aller.Where(m => m.res_TeamAller == m.res_TeamRetour).Count() +
                           t.team.matches_Retour.Where(m => m.res_TeamAller == m.res_TeamRetour).Count()
            }).OrderByDescending(p => p.point).ToList()
            }).ToListAsync();
            return listTeams;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.collectionTeams.Remove(find);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
