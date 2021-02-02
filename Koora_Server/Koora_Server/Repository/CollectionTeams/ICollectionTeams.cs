using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.CollectionTeams
{
   public interface ICollectionTeams
    {
        public Task<IList<CollectionTeam>> List(int id_Champion);
        public Task<IList<Champions>> PointTeams();

        public Task Add(CollectionTeam collectionTeam);
        public Task<CollectionTeam> Find(int id);
        public Task Edit(CollectionTeam collectionTeam);
        public Task Remove(int id);
        public Task Save();
    }
}
