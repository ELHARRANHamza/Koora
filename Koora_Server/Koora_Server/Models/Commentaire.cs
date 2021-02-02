using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Commentaire
    {
        public int id { get; set; }
        [Required]
        [MaxLength(200)]
        public string commentaire { get; set; }
        public News news { get; set; }
        public int pos { get; set; }
        public DateTime date_Cmt { get; set; }
        public AppUsers users { get; set; }
        public IList<ReponseCommentaire> reponseCommentaires { get; set; }

    }
}
