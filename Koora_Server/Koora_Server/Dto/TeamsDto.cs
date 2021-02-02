using Koora_Server.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class TeamsDto
    {
        public int id { get; set; }
        public string nom { get; set; }
        public string logo { get; set; }
        public int id_Country { get; set; }
        public int id_Cat { get; set; }
        public IFormFile file { get; set; }
    }
}
