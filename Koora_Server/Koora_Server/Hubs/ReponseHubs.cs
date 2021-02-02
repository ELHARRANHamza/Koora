using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.Cmt;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Hubs
{
    public class ReponseHubs : Hub
    {
        public ReponseHubs(IRepCommentaire commentaire)
        {
            Commentaire = commentaire;
        }

        public IRepCommentaire Commentaire { get; }

        public async Task reponseCommentaire(ReponseDto reponseDto)
        {
            var reponse = await Commentaire.Reponse(reponseDto);
            await Clients.All.SendAsync("getReponseCommentaire", reponse);
        }
    }
}
