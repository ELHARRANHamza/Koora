using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class AddUserDto
    {
        public int id { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 3)]
        public string nom { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 3)]
        public string prenom { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [StringLength(30, MinimumLength = 12)]
        public string email { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 5)]
        public string userName { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 8)]
        public string password { get; set; }
        public int id_Roles { get; set; }
    }
}
