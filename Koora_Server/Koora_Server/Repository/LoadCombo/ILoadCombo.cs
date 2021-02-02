using Koora_Server.Dto;
using Koora_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Koora_Server.Repository.LoadCombo
{
   public interface ILoadCombo
    {
        public Task<LoadTeamsDto> LoadComboTeams();
        public Task<IList<Contry>> GetContries();

        public Task<IList<Team>> LoadChampionTeams(int id);
        public Task<LoadComMatch> LoadComMatch();
        public Task<IList<Tv>> LoadComMatchTV();
        public Task<IList<Players>> LoadComPlayers(int idTeams);


    }
}
