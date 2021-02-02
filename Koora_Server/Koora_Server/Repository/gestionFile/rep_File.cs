using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.gestionFile
{
    public class rep_File : IGestionFile
    {
        public rep_File(IHostingEnvironment hosting)
        {
            Hosting = hosting;
        }

        public IHostingEnvironment Hosting { get; }

        public async Task<string> Add(IFormFile file,string chemin)
        {
                string fileName;
                if (file.FileName != null)
                {
                    string chemain = Path.Combine(Hosting.WebRootPath, chemin);
                    fileName = file.FileName;
                    string path = Path.Combine(chemain, fileName);
                    await file.CopyToAsync(new FileStream(path, FileMode.Create));
                    return fileName;
                }
                return null;
        }

        public async Task<string> Edit(IFormFile file, string image,string chemin)
        {
            string fileName;
            if(file == null)
            {
                return null;
            }
             if (file.FileName != null)
            {
                string chemain = Path.Combine(Hosting.WebRootPath,chemin);
                fileName = file.FileName;
                string oldPath = Path.Combine(chemain, image);
                string path = Path.Combine(chemain, fileName);
                if(path != oldPath)
                {
                    System.IO.File.Delete(oldPath);
                    await file.CopyToAsync(new FileStream(path, FileMode.Create));
                }
                return fileName;
            }
            return null;
            }
    }
}
