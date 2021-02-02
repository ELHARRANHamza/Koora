using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class ChampionsDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public IFormFile file { get; set; }
    }
}
