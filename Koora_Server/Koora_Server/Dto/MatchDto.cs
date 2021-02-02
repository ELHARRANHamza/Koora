using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class MatchDto
    {
        public int id { get; set; }
        public DateTime date_Match { get; set; }
        public int id_team_Aller { get; set; }
        public int id_team_Retour { get; set; }
        //public int res_TeamAller { get; set; }
        //public int res_TeamRetour { get; set; }
        public string stade { get; set; }
        public int id_champions { get; set; }
        public string type { get; set; }
    }
}
