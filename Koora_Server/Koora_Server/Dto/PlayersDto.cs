using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class PlayersDto
    {
        public int id { get; set; }
        [Required]
        [StringLength(35, MinimumLength = 3)]
        public string Firstname { get; set; }
        [Required]
        [StringLength(35, MinimumLength = 3)]
        public string lastName { get; set; }
        public string image { get; set; }
        [Required]
        public string poste { get; set; }
        [Required]
        public int nombre { get; set; }
        [Required]
        public string nationality { get; set; }
        public DateTime date_Nais { get; set; }
        [Required]
        public string about { get; set; }
        public string vote { get; set; }
        public int id_team { get; set; }
        public IFormFile file { get; set; }
    }
}
