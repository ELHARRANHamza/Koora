using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Contry
    {
        public int id { get; set; }
        [Required]
        [StringLength(30,MinimumLength =3)]
        public string name { get; set; }
        public string image { get; set; }
        public IList<Team> teams { get; set; }
    }
}
