using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class ReponseDto
    {
        public int idCommentaire { get; set; }
        public string userName { get; set; }
        public string reponce { get; set; }
        public DateTime dateReponse { get { return DateTime.Now; } }
    }
}
