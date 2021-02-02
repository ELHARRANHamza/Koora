using Koora_Server.Dto;
using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository
{
    public class rep_Auth : IAuthorization
    {
        public rep_Auth(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public ApplicationDbContext DbContext { get; }
        public async Task<AppUsers> Login(string userName, string password)
        {
            var user = await DbContext.Users.Select(u =>new AppUsers() {
            email = u.email,
            userName = u.userName,
            password = u.password,
            passwordSalt = u.passwordSalt,
            roles = u.roles
            }).SingleOrDefaultAsync(u => u.userName == userName);
            if (testPassword(password, user.password, user.passwordSalt) == true)
            {
                return user;
            }
            return null;
        }

        private bool testPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computHas = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computHas.Length; i++)
                {
                    if (computHas[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }

        public async Task<AppUsers> Register(RegisterDTO registerDTO)
        {
            await CreateUserAdmin();
            if (await userExist(registerDTO.userName, registerDTO.email))
            {
                return null;
            }
            byte[] passwordHash, passworSalt;
            CreatePasswordHash(registerDTO.password, out passwordHash, out passworSalt);
            var user = new AppUsers()
            {
                nom = registerDTO.nom,
                prenom = registerDTO.prenom,
                userName = registerDTO.userName,
                email = registerDTO.email,
                password = passwordHash,
                passwordSalt = passworSalt
            };
            await DbContext.Users.AddAsync(user);
            await DbContext.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passworSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passworSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> userExist(string userName, string email)
        {
            var user = await DbContext.Users.SingleOrDefaultAsync(u => u.email == email || u.userName == userName);
            if(user == null)
            {
                return false;
            }
            return true;
        }
        public async Task CreateRoleAdmin() {
            var role = await DbContext.Roles.SingleOrDefaultAsync(r => r.roleName == "Admin");
            if (role == null)
            {
                var roles = new Roles()
                {
                    roleName = "Admin"
                };
                await DbContext.Roles.AddAsync(roles);
                await DbContext.SaveChangesAsync();
            }
        }
        public async Task CreateUserAdmin()
        {
            await CreateRoleAdmin();
            var role = await DbContext.Roles.SingleOrDefaultAsync(r => r.roleName == "Admin");
            var finduser = await DbContext.Users.
                Include(u => u.roles).
                SingleOrDefaultAsync(u => u.userName == "ELHARRAN Hamza " && u.roles == role);
            if (finduser == null)
            {
                byte[] passwordHash, passworSalt;
                CreatePasswordHash("Hamza1999@", out passwordHash, out passworSalt);
                var user = new AppUsers()
                {
                    nom = "ELHARRAN",
                    prenom = "Hamza",
                    email="harranons@gmail.com",
                    userName="ELHARRAN Hamza",
                    password=passwordHash,
                    passwordSalt=passworSalt,
                    roles = role
                };
                await DbContext.Users.AddAsync(user);
                await DbContext.SaveChangesAsync();
            }
           
        }
       public async Task<List<AppUsers>> ListUserMuch()
        {
            var users = await DbContext.Users.Select(u => new AppUsers
            {
                email = u.email,
                userName = u.userName
            }).ToListAsync();
            return users;
        }
        public async Task<AppUsers> findUser(string userName)
        {
            var find = await DbContext.Users.SingleOrDefaultAsync(u => u.userName == userName);
            return find;
        }
        public async Task changeImage(AppUsers users)
        {
            DbContext.Users.Update(users);
            await DbContext.SaveChangesAsync();
        }
    }
}
