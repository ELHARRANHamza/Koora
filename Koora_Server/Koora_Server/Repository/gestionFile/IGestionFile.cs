using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.gestionFile
{
   public interface IGestionFile
    {
        public Task<string> Add(IFormFile file,string chemain);
        public Task<string> Edit(IFormFile file, string image,string chemain);
    }
}
  