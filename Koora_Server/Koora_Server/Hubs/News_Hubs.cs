using Koora_Server.Dto;
using Koora_Server.Models;
using Koora_Server.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Hubs
{
    public class News_Hubs: Hub
    {
        public News_Hubs(IRepository<News> repository)
        {
            Repository = repository;
        }

        public IRepository<News> Repository { get; }

        public async Task getNews()
        {
                await Clients.All.SendAsync("getData", await Repository.List()); 
        }

    }
}
