using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class Token
    {
        public string token { get; set; }
        public string role { get; set; }
        public DateTime expire { get; set; }
    }
}
