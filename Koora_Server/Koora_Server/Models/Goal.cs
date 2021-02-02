using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Goal
    {
        public int id { get; set; }
        public Players players { get; set; }
        public Match match { get; set; }
        public int minute { get; set; }
    }
}
