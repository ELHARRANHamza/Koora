using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class LoginDto
    {
        [Required]
        [StringLength(25, MinimumLength = 5)]
        public string userName { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 8)]
        public string password { get; set; }
        [Required]
       public bool remember { get; set; }
    }
}
