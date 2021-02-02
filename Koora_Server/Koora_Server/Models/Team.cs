using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Team
    {
        public int id { get; set; }
        public string nom { get; set; }
        public string logo { get; set; }
        public Contry contry { get; set; }
        public IList<Players> players { get; set; }
        public Categorie Categorie { get; set; }
        
        [InverseProperty("team_Retour")]
        public IList<Match> matches_Aller { get; set; }
        [InverseProperty("team_Aller")]
        public IList<Match> matches_Retour { get; set; }
        public IList<CollectionTeam> champions { get; set; }



    }
}
