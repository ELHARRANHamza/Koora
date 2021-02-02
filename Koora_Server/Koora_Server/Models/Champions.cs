using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models 
{
    public class Champions
    {
        public int id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public IList<Match> matches { get; set; }
        public IList<CollectionTeam> teams { get; set; }

    }
}
