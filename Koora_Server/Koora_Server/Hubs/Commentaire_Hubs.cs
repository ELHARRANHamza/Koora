using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.Cmt;
using Koora_Server.Repository.RepositoryUser;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Koora_Server.Hubs
{
    public class Commentaire_Hubs: Hub
    {
        public Commentaire_Hubs(IRepCommentaire commentaire)
        {
            Commentaire = commentaire;
        }
        public IRepCommentaire Commentaire { get; }

        public async Task postCommentaire(string commentaire, int idNews, string userName)
        {
            var cmt = await Commentaire.postCommentaire(commentaire, idNews, userName);
            await Clients.All.SendAsync("getCommentaires", cmt);
        }
        
    }
}
