using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepMatchTv
{
    public interface IMatchTv
    {
        public Task<IList<Match_TV>> List(int id_Match);
        public Task Add(Match_TV match_TV);
        public Task<Match_TV> Find(int id);
        public Task Edit(Match_TV match_TV);
        public Task Remove(int id);
        public Task Save();

    }
}
