using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class DashBoardDto
    {
        public IList<AppUsers> users { get; set; }
        public IList<CommentaireDto> commentaires { get; set; }
        public IList<News> news { get; set; }

    }
}
