using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Dto
{
    public class UserDto
    {
        public IList<AppUsers> users { get; set; }
        public IList<Roles> roles { get; set; }
    }
}
