using Koora_Server.Hubs;
using Koora_Server.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class Rep_News : IRepository<News>
    {
        public Rep_News(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task Add(News entity)
        {
            await DbContext.News.AddAsync(entity);
            await Save();
        }

        public async Task Edit(News news)
        {
            DbContext.News.Update(news);
            await Save();
        }

        public async Task<News> Find(int id)
        {
            var find = await DbContext.News.SingleOrDefaultAsync(n => n.id == id);
            return find;
        }

        public async Task<IList<News>> List()
        {
            
            var liste = await DbContext.News.Select(n => new News {
                id = n.id,
                date_Publiciter = n.date_Publiciter,
                Description = n.Description,
                Image = n.Image,
                Titre = n.Titre,
                GetCategories = n.GetCategories
            }).OrderByDescending(n =>n.date_Publiciter).ToListAsync();
            return liste;
        }

        public async Task Remove(int id)
        {
            var find = await Find(id);
            DbContext.News.Remove(find);
            await Save();
        }
        public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}