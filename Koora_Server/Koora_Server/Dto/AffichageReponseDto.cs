using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class AffichageReponseDto
    {
        public int id { get; set; }
        public string reponse { get; set; }
        public string userName { get; set; }
        public string image { get; set; }
        public DateTime dateReponse { get; set; }
        public int idCommentaire { get; set; }
    }
}
