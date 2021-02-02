using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Hubs
{
    public class MessageHubs: Hub
    {
        public MessageHubs(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task sendMessage(MessageDto messageDto)
        {
            var message = new Message()
            {
                name = messageDto.name,
                date_Poste = messageDto.date_Poste,
                email = messageDto.email,
                message = messageDto.message,
                etat = 0
            };
            await DbContext.Messages.AddAsync(message);
            await DbContext.SaveChangesAsync();
            await Clients.All.SendAsync("receveMessage", messageDto);
        }
    
    }
}
