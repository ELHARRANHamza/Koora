using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class MessageDto
    {
        public int id { get; set; }
        [Required]
        [StringLength(35, MinimumLength =4)]
        public string name { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [StringLength(50,MinimumLength = 14)]
        public string email { get; set; }
        public string adresse { get; set; }
        [Required]
        [MinLength(4)]
        public string message { get; set; }
        public int etat { get { return 0; }}
        public DateTime date_Poste { get { return DateTime.Now; } }
    }
}
