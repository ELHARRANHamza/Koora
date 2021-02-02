using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Hubs;
using Koora_Server.Models;
using Koora_Server.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        public IRepository<News> Repository { get; }
        public IRepository<Categorie> Rep_Cat { get; }
        public IHostingEnvironment Hosting { get; }

        public NewsController(IRepository<News> repository,
            IRepository<Categorie> rep_Cat,
            IHostingEnvironment hosting
)
        {
            Repository = repository;
            Rep_Cat = rep_Cat;
            Hosting = hosting;
        }

        // POST: api/News
        [HttpPost("posteNews")]
        public async Task posteNews([FromForm] newsDto newsdto)
        {
            string fileName;
            if (newsdto.file.FileName != null)
            {
                string chemain = Path.Combine(Hosting.WebRootPath, "News");
                fileName = newsdto.file.FileName;
                string path = Path.Combine(chemain, fileName);
                await newsdto.file.CopyToAsync(new FileStream(path, FileMode.Create));
                var find_Cat = await Rep_Cat.Find(newsdto.id_Cat);
                var news = new News()
                {
                    Titre = newsdto.Titre,
                    date_Publiciter = DateTime.Now,
                    Description = newsdto.Description,
                    GetCategories = find_Cat,
                    Image = fileName
                };
                await Repository.Add(news);
            }
            }
        [HttpGet("getNews")]
        public async Task<IList<News>> getNews()
        {
            return await Repository.List();
        }
        [HttpDelete("deleteNews/{id}")]
        public async Task<IActionResult> deleteNews(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            await Repository.Remove(id);
            return Ok();
        }
        [HttpPut("editNews/{id}")]
        public async Task editNews([FromForm] newsDto newsDto,int id)
        {
           var findNews = await Repository.Find(id);
            var findCat = await Rep_Cat.Find(newsDto.id_Cat);
            findNews.Titre = newsDto.Titre;
            findNews.Description = newsDto.Description;
            findNews.GetCategories = findCat;
            if(newsDto.file.FileName != null)
            {
                string chemain = Path.Combine(Hosting.WebRootPath, "News");
                string fileName = newsDto.file.FileName;
                string path = Path.Combine(chemain, fileName);
                string oldPath = Path.Combine(chemain, findNews.Image);

                if (path != oldPath)
                {
                    findNews.Image = fileName;
                    System.IO.File.Delete(oldPath);
                    await newsDto.file.CopyToAsync(new FileStream(path, FileMode.Create));
                }
            }
            await Repository.Edit(findNews);
        }

    }
}
