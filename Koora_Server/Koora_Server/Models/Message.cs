using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Message
    {
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string message { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string email { get; set; }
        public DateTime date_Poste { get; set; }
        public int etat { get; set; }
    }
}
