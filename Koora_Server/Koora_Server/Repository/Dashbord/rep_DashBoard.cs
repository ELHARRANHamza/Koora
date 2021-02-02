using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.Dashbord
{
    public class rep_DashBoard : IDashboard
    {
        public rep_DashBoard(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task<DashBoardDto> DashBoardDto()
        {
           
            var users = await DbContext.Users.Select(u => new AppUsers
            {
                email = u.email,
                userName = u.userName,
                image = u.image,
                roles = u.roles
            }).ToListAsync();
            var liste_Cmt = await DbContext.Commentaires.Select(c => new CommentaireDto
            {
                commentaire = c.commentaire,
                date_Poste = c.date_Cmt,
                userName = c.users.userName,
                image = c.users.image,
                id_News = c.news.id
            }).ToListAsync();
            var news = await DbContext.News.Select(n => new News
            {
                id = n.id,
                date_Publiciter = n.date_Publiciter,
                Description = n.Description,
                Image = n.Image,
                Titre = n.Titre,
                GetCategories = n.GetCategories,
                commentaires = n.commentaires
            }).OrderByDescending(n => n.date_Publiciter).ToListAsync();
            var dash = new DashBoardDto()
            {
                users = users,
                news = news,
                commentaires = liste_Cmt
            };
            return dash;
        }
    }
}
