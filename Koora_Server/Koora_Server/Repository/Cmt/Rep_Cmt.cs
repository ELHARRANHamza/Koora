using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.Cmt
{
    public class Rep_Cmt : IRepCommentaire
    {
        public Rep_Cmt(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task<IList<CommentaireDto>> getCommentaires(int id_News)
        {
            var liste_Cmt = await DbContext.Commentaires.Select(c => new CommentaireDto {
            id = c.id,    
            commentaire = c.commentaire,
            date_Poste = c.date_Cmt,
            userName = c.users.userName,
            image = c.users.image,
            id_News = c.news.id,
            reponseCommentaires = c.reponseCommentaires.Select(r => new AffichageReponseDto() { 
            id = r.id,
            dateReponse = r.dateReponse,
            reponse = r.reponse,
            userName = r.users.userName,
            image = r.users.image
            }).OrderByDescending(rep => rep.dateReponse).ToList()
            }).Where(c => c.id_News == id_News).ToListAsync();
            return liste_Cmt;
        }

        public async Task<CommentaireDto> postCommentaire(string commentaire, int idNews, string userName)
        {
            var find_News = await DbContext.News.SingleOrDefaultAsync(n => n.id == idNews);
            var find_User = await DbContext.Users.SingleOrDefaultAsync(n => n.userName == userName);
            var dte_Cmt = DateTime.Now;
            var cmt = new Commentaire()
            {
                commentaire = commentaire,
                news = find_News,
                users = find_User,
                date_Cmt = dte_Cmt,
                pos = 1,
                reponseCommentaires = null
            };
            await DbContext.Commentaires.AddAsync(cmt);
            await DbContext.SaveChangesAsync();
            var cmtDto = new CommentaireDto()
            {
                userName = find_User.userName,
                date_Poste = dte_Cmt,
                commentaire = commentaire,
                image = find_User.image,
                id_News = idNews
            };
            return cmtDto;
        }

        public async Task<AffichageReponseDto> Reponse(ReponseDto reponseDto)
        {
            if (reponseDto == null)
                return null;
            var find_User = await DbContext.Users.SingleOrDefaultAsync(u => u.userName == reponseDto.userName);
            var findCmt = await DbContext.Commentaires.SingleOrDefaultAsync(c =>c.id == reponseDto.idCommentaire);
            var reponse = new ReponseCommentaire()
            {
                commentaire = findCmt,
                users = find_User,
                reponse = reponseDto.reponce,
                dateReponse = DateTime.Now
            };
            await DbContext.reponseCommentaires.AddAsync(reponse);
            await DbContext.SaveChangesAsync();
            var rep = new AffichageReponseDto()
            {
                dateReponse = reponseDto.dateReponse,
                reponse = reponseDto.reponce,
                image = find_User.image,
                userName = reponseDto.userName,
                idCommentaire = reponseDto.idCommentaire
            };
            return rep;
        }
    }
}
