using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepMessage
{
    public class RepMessage : IRepMessage
    {
        public RepMessage(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }

        public async Task<IList<Message>> getAllMessage()
        {
           var messages = await DbContext.Messages.OrderByDescending(m => m.date_Poste).ToListAsync();
            return messages;
        }

        public async Task<IList<Message>> getMessageEtat(int etat)
        {
            var messages = await DbContext.Messages.Where(m => m.etat == etat).ToListAsync();
            return messages;
        }

        public async Task Remove(int id)
        {
            var find = await DbContext.Messages.SingleOrDefaultAsync(m =>m.id == id);
            DbContext.Messages.Remove(find);
            await DbContext.SaveChangesAsync();
        }
       
    }
}
