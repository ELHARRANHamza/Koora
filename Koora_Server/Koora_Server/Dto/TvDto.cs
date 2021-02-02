using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class TvDto
    {
        public int id { get; set; }
        public string nom { get; set; }
        public IFormFile file { get; set; }
        public string logo { get; set; }
    }
}
