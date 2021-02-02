using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class ReponseCommentaire
    {
        public int id { get; set; }
        public string reponse { get; set; }
        public Commentaire commentaire { get; set; }
        public AppUsers users { get; set; }
        public DateTime dateReponse { get; set; }
    }
}
