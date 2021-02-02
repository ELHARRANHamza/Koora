using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepMessage
{
   public interface IRepMessage
    {
        public Task<IList<Message>> getAllMessage();
        public Task<IList<Message>> getMessageEtat(int etat);
        public Task Remove(int id); 
    }
}
