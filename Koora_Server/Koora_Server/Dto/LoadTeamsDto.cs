using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class LoadTeamsDto
    {
       public IList<Categorie> Categories { get; set; }
        public IList<Contry> Contries { get; set; }
    }
}
