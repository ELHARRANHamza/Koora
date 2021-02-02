using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Models
{
    public class AppUsers
    {
        public int id { get; set; }
        [Required]
        [StringLength(25, MinimumLength =3)]
        public string nom { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 3)]
        public string prenom { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [StringLength(30, MinimumLength = 12)]
        public string email { get; set; }
        [Required]
        [StringLength(25,MinimumLength =5)]
        public string userName { get; set; }
        public string image { get; set; }
        public byte [] password { get; set; }
        public byte[] passwordSalt { get; set; }
        public IList<Commentaire> commentaires { get; set; }
        public IList<ReponseCommentaire> reponseCommentaires { get; set; }

        public Roles roles { get; set; }

    }
}
