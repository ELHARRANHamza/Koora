using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Match
    {
        public int id { get; set; }
        public DateTime date_Match { get; set; }
        public Team team_Aller { get; set; }
        public Team team_Retour { get; set; }
        public int res_TeamAller { get; set; }
        public int res_TeamRetour { get; set; }
        public string stade { get; set; }
        public IList<Goal> goals{ get; set; }
        public Champions champions { get; set; }
        public IList<Match_TV> match_TVs { get; set; }
        public int etat { get; set; }
        public string type { get; set; }
    }
}
