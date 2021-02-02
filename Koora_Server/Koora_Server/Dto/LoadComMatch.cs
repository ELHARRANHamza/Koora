using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class LoadComMatch
    {
        public IList<Champions> champions { get; set; }
        public IList<Team> teams { get; set; }
    }
}
