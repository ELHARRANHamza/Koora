using Koora_Server.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class newsDto
    {
        public int id { get; set; }
        [Required]
        [StringLength(250, MinimumLength = 4)]
        public string Titre { get; set; }
        [Required]
        [MinLength(10)]
        public string Description { get; set; }
        public string Image { get; set; }
        public int id_Cat { get; set; }
        public IFormFile file { get; set; }
    }
}
