using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
   public interface IRepository<TEntity>
    {
        public Task<IList<TEntity>> List();
        public Task<TEntity> Find(int id);
        public Task Add(TEntity entity);
        public Task Edit(TEntity entity);
        public Task Remove(int id);
        public Task Save();
    }
}
