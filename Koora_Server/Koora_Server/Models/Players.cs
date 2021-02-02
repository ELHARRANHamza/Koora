using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Players
    {
        public int id { get; set; }
        public string Firstname { get; set; }
        public string  lastName{ get; set; }
        public string image { get; set; }
        public string poste { get; set; }
        public DateTime date_Nais { get; set; }
        public int nombre { get; set; }
        public string nationality { get; set; }
        public string about { get; set; }
        public string vote { get; set; }
        public Team team { get; set; }
        public IList<Goal> goals { get; set; }

    }
}
