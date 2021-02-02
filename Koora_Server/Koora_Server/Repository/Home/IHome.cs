using Koora_Server.Dto;
using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.Home
{
    public interface IHome
    {
        public Task<IList<News>> Home();
        public Task<BlogDto> Blog();
        public Task<News> Details(int id);
    }
}
