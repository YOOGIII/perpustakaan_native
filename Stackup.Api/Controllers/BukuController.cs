using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;


[Route("api/[controller]")]
[ApiController]

public class BukuController : ControllerBase
{
    private readonly DbBook _dbManager;

    private readonly Response response = new Response();

    public BukuController(IConfiguration configuration)
    {
        _dbManager = new DbBook(configuration);
    }

    [HttpGet("/Buku")]

    public IActionResult GetBuku()
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetAllBuku();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpGet("/BukuByKategori/{kategoriId}")]
    public IActionResult GetBukuByKategori(int kategoriId)
    {
        try
        {
            response.status = 200;
            response.message = "Success";
            response.data = _dbManager.GetBukuByKategori(kategoriId); // Pastikan metode ini ada di DbBook.cs
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpGet("/Buku/{id}")]
    public IActionResult GetBukuById(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetBukuById(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }


    [HttpPost("/Buku/post")]
    
    public IActionResult CreateBuku([FromBody] Buku buku)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            _dbManager.CreateBuku(buku);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpPut("Buku/update/{id}")]

    public IActionResult UpdateBuku(int id, [FromBody] Buku buku)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            _dbManager.UpdateBuku(id, buku);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

    [HttpDelete("Buku/delete/{id}")]

    public IActionResult DeleteBuku(int id)
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            _dbManager.DeleteBuku(id);
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }
}