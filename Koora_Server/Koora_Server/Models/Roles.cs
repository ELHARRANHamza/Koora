using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class Roles
    {
        public int id { get; set; }
        public string roleName { get; set; }
        public IList<AppUsers> users { get; set; }
    }
}
