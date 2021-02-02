using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class BlogDto
    {
        public IList<News> GetNews { get; set; }
        public IList<Categorie> GetCategories { get; set; }
    }
}
