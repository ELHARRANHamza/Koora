using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class CollectionTeam
    {
        public int id { get; set; }
        public Team team { get; set; }
        public Champions champions { get; set; }
        public int point { get; set; }
        public int nbMatch { get; set; }
        public int nbMatchW { get; set; }
        public int nbMatchL { get; set; }
        public int nbMatchB { get; set; }
        public int res { get; set; }
    }
}
