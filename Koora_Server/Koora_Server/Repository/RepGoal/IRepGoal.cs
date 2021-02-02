using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepGoal
{
    public interface IRepGoal
    {
        public Task Add(Goal goal);
        public Task Save();

    }
}
