using Koora_Server.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.Dashbord
{
   public interface IDashboard
    {
        public Task<DashBoardDto> DashBoardDto();
    }
}
