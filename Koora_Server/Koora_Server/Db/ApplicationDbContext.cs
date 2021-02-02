using Koora_Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
        }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<AppUsers> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Commentaire> Commentaires { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Players> Players { get; set; }
        public DbSet<Contry> Contry { get; set; }
        public DbSet<Tv> Tvs { get; set; }
        public DbSet<Champions> Champions { get; set; }

        public DbSet<Goal> Goals { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Match_TV> Match_TV { get; set; }
        public DbSet<CollectionTeam> collectionTeams { get; set; }
        public DbSet<ReponseCommentaire> reponseCommentaires { get; set; }

    }
}
