using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.Home
{
    public class Rep_Home : IHome
    {
        public Rep_Home(IRepository<News> rep_News,
            IRepository<Categorie> rep_Cat)
        {
            Rep_News = rep_News;
            Rep_Cat = rep_Cat;
        }

        public IRepository<News> Rep_News { get; }
        public IRepository<Categorie> Rep_Cat { get; }

        public async Task<IList<News>> Home()
        {
            return await Rep_News.List();
        }
        public async Task<BlogDto> Blog()
        {
            var news = await Rep_News.List();
            var categories = await Rep_Cat.List();
            var blogs = new BlogDto()
            {
                GetCategories = categories,
                GetNews = news
            };
            return blogs;
        }
        public async Task<News> Details(int id)
        {
            if(id == 0)
            {
                return null;
            }
            var find = await Rep_News.Find(id);
            if(find == null)
            {
                return null;
            }
            return find;
        }
    }
}
