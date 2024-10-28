using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class MemberController : ControllerBase
{
    private readonly DbBook _dbManager;
    private readonly Response response = new Response();

    public MemberController(IConfiguration configuration)
    {
        _dbManager = new DbBook(configuration);
    }

    [HttpPost("post")]
    public IActionResult CreateMember([FromBody] Member member)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.CreateMember(member);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetMemberById(int id)
    {
        try
        {
            var member = _dbManager.GetMemberById(id);
            if (member != null)
            {
                return Ok(new { success = true, member });
            }
            else
            {
                return NotFound(new { success = false, message = "Member not found" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }
}