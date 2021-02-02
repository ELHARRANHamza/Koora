using Koora_Server.Dto;
using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
   public interface IAuthorization
    {
        public Task<AppUsers> Register(RegisterDTO registerDTO);
        public Task<AppUsers> Login(string userName, string password);
        public Task<bool> userExist(string userName, string email);
        Task<List<AppUsers>> ListUserMuch();
        public Task<AppUsers> findUser(string userName);
        public Task changeImage(AppUsers users);

    }
}
