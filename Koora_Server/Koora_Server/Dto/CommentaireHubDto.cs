using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class CommentaireHubDto
    {
       public string commentaire { get; set; } 
       public int idNews { get; set; }
       public string userName { get; set; }
       public IList<ReponseDto> reponseCommentaires { get; set; }
    }
}
