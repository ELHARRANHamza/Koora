using Koora_Server.Dto;
using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepositoryUser
{
    public interface IUser
    {
        public void createPassword(string password, out byte[] passwordHash, out byte[] passwordSalt);
        public Task<UserDto> GetUserDto();
        public Task posteUser(AddUserDto registerDTO);
        Task<List<AppUsers>> List();
        Task<AppUsers> Find(int id);
        public Task Edit(EditUserDto entity, int id);
        public Task Delete(int id);


    }
}
