using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Koora_Server.Repository.RepMessage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Koora_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles="Admin")]
    public class MessageController : ControllerBase
    {
        public MessageController(IRepMessage repMessage)
        {
            RepMessage = repMessage;
        }

        public IRepMessage RepMessage { get; }

        [HttpGet("getAllMessage")]
        public async Task<IActionResult> getAllMessage()
        {
            var messages = await RepMessage.getAllMessage();
            return Ok(messages);
        }
        [HttpDelete("deleteMessage/{id}")]
        public async Task<IActionResult> deleteMessage(int id)
        {
            if (id == 0)
                return BadRequest();
            await RepMessage.Remove(id);
            return Ok();
        }

    }
}