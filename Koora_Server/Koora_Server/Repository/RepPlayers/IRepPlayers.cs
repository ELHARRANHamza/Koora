using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepPlayers
{
   public interface IRepPlayers
    {
        public Task<IList<Players>> GetPlayers(int id);
        public Task<IList<Players>> BestPlayers();
    }
}
