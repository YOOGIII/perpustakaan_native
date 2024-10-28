public class Transaksi
{
    public int id {get;set;}
    public int id_buku {get;set;}
    public int id_member {get;set;}
    public DateTime tanggal_pinjam {get;set;}
    public DateTime tanggal_kembali {get;set;}
    public string status {get;set;}
}