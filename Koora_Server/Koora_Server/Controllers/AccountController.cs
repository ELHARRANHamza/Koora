using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Koora_Server.Dto;
using Koora_Server.Repository;
using Koora_Server.Repository.RepositoryUser;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Logging;
using System.IO;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public AccountController(IAuthorization authorization,
            IConfiguration configuration,
            IHostingEnvironment hosting)
        {
            Authorization = authorization;
            Configuration = configuration;
            Hosting = hosting;
        }

        public IAuthorization Authorization { get; }
        public IConfiguration Configuration { get; }
        public IHostingEnvironment Hosting { get; }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            if (ModelState.IsValid)
            {
                if (await Authorization.userExist(registerDTO.userName, registerDTO.email))
                {
                    return Unauthorized("the userName or email is exist");
                }
                await Authorization.Register(registerDTO);
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var login = await
                           Authorization.Login(dto.userName, dto.password);
            if (login == null) return Unauthorized();
            DateTime expire;
            if(dto.remember == true)
            {
                expire = DateTime.Now.AddDays(5);
            }
            else
            {
                expire = DateTime.Now.AddHours(8);
            }
            var claims = new[]
            {
                    new Claim(ClaimTypes.NameIdentifier,login.id.ToString()),
                    new Claim(ClaimTypes.Name,dto.userName),
                    new Claim(ClaimTypes.Role,login.roles.roleName)
                };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Appsettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expire,
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var objToken = new Token()
            {
                role = login.roles.roleName,
                token = tokenHandler.WriteToken(token),
                expire = expire
            };
            return Ok(objToken);
        }
        // GET: api/User
        [HttpGet("getUsers")]
        public async Task<IActionResult> Get()
        {
            return Ok(await Authorization.ListUserMuch());
        }
        [HttpPatch("changeImage/{userName}")]
        public async Task<IActionResult> changeImage(string userName,[FromForm] IFormFile file)
        {
            string fileName = "";
            if (userName == null)
            {
                return BadRequest();
            }
            if(file.FileName != null)
            {
                var findUser = await Authorization.findUser(userName);
                if(findUser == null)
                {
                    return BadRequest();
                }
                string chemain = Path.Combine(Hosting.WebRootPath, "ImageUser");
                fileName = file.FileName;
                string path = Path.Combine(chemain, fileName);
                if (findUser.image == null)
                {
                    await file.CopyToAsync(new FileStream(path, FileMode.Create));
                }
                else
                {
                    string oldPath = Path.Combine(chemain,findUser.image);
                    if(oldPath != path)
                    {
                        System.IO.File.Delete(oldPath);
                        await file.CopyToAsync(new FileStream(path, FileMode.Create));
                    }
                }
                findUser.image = fileName;
                await Authorization.changeImage(findUser);
                return Ok();
            }
            return BadRequest();
        }
        [HttpGet("getImage/{userName}")]
        public async Task<IActionResult>getImage(string userName){
            var find = await Authorization.findUser(userName);
            return Ok(find);
        }

    }
    }