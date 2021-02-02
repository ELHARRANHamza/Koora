using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Match_TV
    {
        public int id { get; set; }
        public Match match { get; set; }
        public Tv tv { get; set;}
    }
}
