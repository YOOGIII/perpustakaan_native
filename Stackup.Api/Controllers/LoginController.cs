using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using Microsoft.Extensions.Logging; // Tambahkan ini

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly string connectionString;
    private readonly ILogger<LoginController> logger;

    public LoginController(IConfiguration configuration, ILogger<LoginController> logger)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
        this.logger = logger;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT id, role FROM member WHERE username = @Username AND password = @Password";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Username", request.username);
                    command.Parameters.AddWithValue("@Password", request.password);
                    
                    connection.Open();
                    var reader = command.ExecuteReader();
                    
                    if (reader.Read())
                    {
                        var memberId = reader.GetInt32("id");
                        var role = reader.GetString("role"); 
                        
                        logger.LogInformation($"Login berhasil untuk username: {request.username}, memberId: {memberId}, role: {role}");
                        
                        return Ok(new { success = true, memberId, role });
                    }
                    else
                    {
                        logger.LogWarning($"Login gagal untuk username: {request.username}");
                        return Ok(new { success = false });
                    }
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saat login");
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
