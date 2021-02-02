using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class CommentaireDashDto
    {
        public int id_News { get; set; }
        public string commentaire { get; set; }
        public string userName { get; set; }
        public string image { get; set; }
        public DateTime date_Poste { get; set; }
        public int nb { get; set; }
    }
}
