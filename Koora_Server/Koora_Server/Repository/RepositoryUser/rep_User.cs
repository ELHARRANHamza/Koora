using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.RepositoryUser
{
    public class rep_User : IUser
    {
        public rep_User(ApplicationDbContext dbContext,
            IRepository<Roles> repository)
        {
            DbContext = dbContext;
            Repository = repository;
        }

        public ApplicationDbContext DbContext { get; }
        public IRepository<Roles> Repository { get; }

        public async Task<UserDto> GetUserDto()
        {
            var users = await DbContext.Users.Select(u=> new AppUsers { 
            email=u.email,
            userName=u.userName
            }).ToListAsync();
            var roles = await DbContext.Roles.ToListAsync();
            var userDto = new UserDto()
            {
                users = users,
                roles = roles
            };
            return userDto;
        }
        public async Task posteUser(AddUserDto registerDTO)
        {
            byte[] passwordHash, passwordSalt;
            createPassword(registerDTO.password, out passwordHash, out passwordSalt);
            var findRoles = await Repository.Find(registerDTO.id_Roles);
            var user = new AppUsers()
            {
                userName = registerDTO.userName,
                nom = registerDTO.nom,
                prenom = registerDTO.prenom,
                email = registerDTO.email,
                password = passwordHash,
                passwordSalt = passwordSalt,
                roles = findRoles
            };
            await DbContext.Users.AddAsync(user);
            await Save();
        }

        public void createPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
           using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        public async Task <List<AppUsers>> List()
        {
            var users = await DbContext.Users.Select(u => new AppUsers()
            {
                id = u.id,
                nom = u.nom,
                prenom = u.prenom,
                email = u.email,
                userName = u.userName,
                roles = u.roles
            }

            ).ToListAsync();
            return users;
        }
        public async Task<AppUsers> Find(int id)
        {
            if(id == 0)
            {
                return null;
            }
            var findUser = await DbContext.Users.SingleOrDefaultAsync(u => u.id == id);
            if(findUser == null)
            {
                return null;
            }
            return findUser;
        }
        public async Task Edit(EditUserDto entity,int id)
        {
            var findUser = await Find(id);
            var findRoles = await Repository.Find(entity.id_Roles);
            findUser.nom = entity.nom;
            findUser.prenom = entity.prenom;
            findUser.email = entity.email;
            findUser.userName = entity.userName;
            findUser.roles = findRoles;
            if(entity.password != string.Empty)
            {
                byte[] passwordHash, passwordSalt;
                createPassword(entity.password, out passwordHash, out passwordSalt);
                findUser.password = passwordHash;
                findUser.passwordSalt = passwordSalt;
            }
             DbContext.Users.Update(findUser);
            await Save();
        }
        public async Task Delete(int id)
        {
            var find = await Find(id);
            DbContext.Remove(find);
            await Save();
        }
            public async Task Save()
        {
            await DbContext.SaveChangesAsync();
        }
    }
}
