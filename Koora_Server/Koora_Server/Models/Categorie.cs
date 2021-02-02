using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Categorie
    {
        public int id { get; set; }
        [Required]
        [StringLength(35, MinimumLength = 3)]
        public string cat_Nom { get; set; }
        public IList<News> News { get; set; }
        public IList<Team> Teams { get; set; }

    }
}
