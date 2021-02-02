using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepMatch
{
    public interface IMatch
    {
        public Task Add(Match entity);
        public Task<Champions> GetMatchChampion(int id,int etat);
        public Task Edit(Match match);
        public Task<Match> Find(int id);
        public Task Remove(int id);
        public Task<IList<Champions>> GetMatch(int etat);

    }
}
