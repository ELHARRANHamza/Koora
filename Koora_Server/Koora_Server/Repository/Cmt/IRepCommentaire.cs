using Koora_Server.Dto;
using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.Cmt
{
   public interface IRepCommentaire
    {

        public Task<CommentaireDto> postCommentaire(string commentaire, int idNews, string userName);
        public Task<IList<CommentaireDto>> getCommentaires(int id_News);
        public Task<AffichageReponseDto> Reponse(ReponseDto reponseDto);
    }
}
