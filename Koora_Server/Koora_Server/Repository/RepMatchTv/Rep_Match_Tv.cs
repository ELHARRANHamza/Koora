using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepMatchTv
{
    public class Rep_Match_Tv : IMatchTv
    {
        public Rep_Match_Tv(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(Match_TV match_TV)
        {
            await DbContext.Match_TV.AddAsync(match_TV);
            await Save();
        }

        public async Task Edit(Match_TV match_TV)
        {
            DbContext.Match_TV.Update(match_TV);
            await Save();
        }

        public async Task<Match_TV> Find(int id)
        {
           var find = await DbContext.Match_TV.SingleOrDefaultAsync(mt => mt.id == id);
            return find;
        }

        public async Task<IList<Match_TV>> List(int id_Match)
        {
            var list = await DbContext.Match_TV.Select(mt => new Match_TV
            {
                id = mt.id,
                match = mt.match,
                tv = mt.tv
            }).Where(mt => mt.match.id == id_Match).ToListAsync();
            return list;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.Match_TV.Remove(find);
            await Save();
        }

        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
