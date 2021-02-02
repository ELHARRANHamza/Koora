using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Tv
    {
        public int id { get; set; }
        public string nom { get; set; }
        public string logo { get; set; }
        public IList<Match_TV> match_TVs { get; set; }
    }
}
