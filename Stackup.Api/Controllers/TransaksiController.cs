using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;


[Route("api/[controller]")]
[ApiController]

public class TransaksiController : ControllerBase
{
    private readonly DbBook _dbManager;

    private readonly Response response = new Response();

    public TransaksiController(IConfiguration configuration)
    {
        _dbManager = new DbBook(configuration);
    }

[HttpGet("/Transaksi")]

    public IActionResult GetTransaksi()
    {
        try
        {
            response.status = 200;
            response.message = "Succes";
            response.data = _dbManager.GetAllTransaksi();
        }
        catch (Exception ex)
        {
            response.status = 500;
            response.message = ex.Message;
        }
        return Ok(response);
    }

[HttpPost]
    public IActionResult Post([FromBody] Transaksi transaksi)
    {
        try
        {
            bool isPeminjamanAktif = _dbManager.CekPeminjamanAktif(transaksi.id_member);
            if (isPeminjamanAktif)
            {
                return BadRequest("Anda sudah memiliki peminjaman aktif.");
            }

            var result = _dbManager.CreateTransaksi(transaksi);
            if (result == 1)
                return Ok("Transaksi berhasil ditambahkan.");
            else
                return BadRequest("Gagal menambahkan transaksi.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Gagal karena: {ex.Message}");
        }
    }

    [HttpPost("cek-peminjaman-aktif")]
    public IActionResult CekPeminjamanAktif([FromBody] int idMember)
    {
        try
        {
            bool isPeminjamanAktif = _dbManager.CekPeminjamanAktif(idMember);
            return Ok(isPeminjamanAktif);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Gagal karena: {ex.Message}");
        }
    }
}