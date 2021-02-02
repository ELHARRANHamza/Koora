using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Repository.Dashbord;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class DashBoardController : ControllerBase
    {
        public DashBoardController(IDashboard dashboard)
        {
            Dashboard = dashboard;
        }

        public IDashboard Dashboard { get; }
        [HttpGet("getDashBoard")]
        public async Task<IActionResult> getDashBoard()
        {
            return Ok(await Dashboard.DashBoardDto());
        }
    }
}