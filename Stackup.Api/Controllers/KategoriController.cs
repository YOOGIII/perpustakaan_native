using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;


[Route("api/[controller]")]
[ApiController]

public class KategoriController : ControllerBase
{
    private readonly DbBook _dbManager;

    private readonly Response response = new Response();

    public KategoriController(IConfiguration configuration)
    {
        _dbManager = new DbBook(configuration);
    }

    [HttpGet("/Kategori")]

    public IActionResult GetKategori()
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetAllKategori();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpGet("/Kategori/{id}")]
    public IActionResult GetKategoriByBukuId(int bukuId)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetKategoriByBukuId(bukuId);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
    

    [HttpPost("/Kategori/post")]
    
    public IActionResult CreateKategori([FromBody] Kategori kategori)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            _dbManager.CreateKategori(kategori);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpPut("Kategori/update/{id}")]

    public IActionResult UpdateKategori(int id, [FromBody] Kategori Kategori)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            _dbManager.UpdateKategori(id, Kategori);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpDelete("Kategori/delete/{id}")]
    public IActionResult DeleteKategori(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            _dbManager.DeleteKategori(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}