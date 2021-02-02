using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Koora_Server.Hubs;
using Koora_Server.Models;
using Koora_Server.Repository;
using Koora_Server.Repository.Cmt;
using Koora_Server.Repository.CollectionTeams;
using Koora_Server.Repository.Dashbord;
using Koora_Server.Repository.FinishMatch;
using Koora_Server.Repository.gestionFile;
using Koora_Server.Repository.Home;
using Koora_Server.Repository.LoadCombo;
using Koora_Server.Repository.RepGoal;
using Koora_Server.Repository.RepMatch;
using Koora_Server.Repository.RepMatchTv;
using Koora_Server.Repository.RepMessage;
using Koora_Server.Repository.RepositoryUser;
using Koora_Server.Repository.RepPlayers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Koora_Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
      AddJwtBearer(opt =>
      {
          opt.TokenValidationParameters = new TokenValidationParameters
          {
              ValidateIssuerSigningKey = true,
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("Appsettings:Token").Value)),
              ValidateIssuer = false,
              ValidateAudience = false
          };
      });
            services.AddDbContext<ApplicationDbContext>(op =>
            {
                op.UseSqlServer(Configuration.GetConnectionString("cnx_Kora"));
            });
            services.AddScoped<IAuthorization, rep_Auth>();
            services.AddScoped<IDashboard, rep_DashBoard>();
            services.AddScoped<IRepository<Categorie>, Rep_Categorie>();
            services.AddScoped<IRepository<Roles>, Rep_Roles>();
            services.AddScoped<IRepository<News>, Rep_News>();
            services.AddScoped<IUser, rep_User>();
            services.AddScoped<IHome, Rep_Home>();
            services.AddScoped<IRepCommentaire, Rep_Cmt>();
            services.AddScoped<IRepository<Contry>, Rep_Country>();
            services.AddScoped<IRepository<Team>, rep_Teams>();
            services.AddScoped<IRepository<Players>, rep_Players>();
            services.AddScoped<IRepository<Tv>, Rep_Tv>();
            services.AddScoped<IRepository<Champions>, Rep_Champions>();
            services.AddScoped<IMatch, Rep_Match>();
            services.AddScoped<ILoadCombo, LoadCombo>();
            services.AddScoped<IGestionFile, rep_File>();
            services.AddScoped<IRepPlayers, Rep_Players>();
            services.AddScoped<IMatchTv, Rep_Match_Tv>();
            services.AddScoped<IRepGoal, RepGoal>();
            services.AddScoped<ICollectionTeams, RepCollectionTeams>();
            services.AddScoped<IRepFinishMatch, RepFinish>();
            services.AddScoped<IRepMessage, RepMessage>();

            services.AddCors(op =>
            {
                op.AddPolicy("CorsPolicy", builder =>
                 builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            });
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("CorsPolicy");
            app.UseEndpoints(endpoints => {
                endpoints.MapHub<News_Hubs>("/news_Hubs");
                endpoints.MapHub<Commentaire_Hubs>("/commentaire_Hubs");
                endpoints.MapHub<GoalHubs>("/goalHubs");
                endpoints.MapHub<MatchHubs>("/matchHubs");
                endpoints.MapHub<MessageHubs>("/messageHubs");
                endpoints.MapHub<ReponseHubs>("/reponseHubs");
                endpoints.MapHub<VueHubs>("/vueHubs");

            });
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseStaticFiles(new StaticFileOptions(){
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot")),
                RequestPath = new PathString("/wwwroot")
            });
        }
    }
}
