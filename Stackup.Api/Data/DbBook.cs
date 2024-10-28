using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;

public class DbBook
{
    private readonly string connectionString;

    private readonly MySqlConnection _connection;

    public DbBook(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
        _connection = new MySqlConnection(connectionString);
    }

    public List<Buku> GetAllBuku()
    {
        List<Buku> BukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM buku";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku buku = new Buku
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            judul = reader["Judul"].ToString(),
                            image = reader["Image"].ToString(),
                            sinopsis = reader["Sinopsis"].ToString(),
                            pengarang = reader["Pengarang"].ToString(),
                            tahun_terbit = Convert.ToInt32(reader["Tahun_terbit"]),
                            id_kategori = Convert.ToInt32(reader["Id_kategori"]),
                            stok = Convert.ToInt32(reader["Stok"])
                        };
                        BukuList.Add(buku);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return BukuList;
    }

     public List<Buku> GetBukuByKategori(int kategoriId)
    {
        List<Buku> BukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM buku WHERE id_kategori = @KategoriId";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@KategoriId", kategoriId);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku buku = new Buku
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            judul = reader["Judul"].ToString(),
                            image = reader["Image"].ToString(),
                            sinopsis = reader["Sinopsis"].ToString(),
                            pengarang = reader["Pengarang"].ToString(),
                            tahun_terbit = Convert.ToInt32(reader["Tahun_terbit"]),
                            id_kategori = Convert.ToInt32(reader["Id_kategori"]),
                            stok = Convert.ToInt32(reader["Stok"])
                        };
                        BukuList.Add(buku);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return BukuList;
    }
     public List<Buku> GetBukuById(int id)
    {
        List<Buku> BukuList = new List<Buku>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM buku WHERE id = @Id";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Buku buku = new Buku
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            judul = reader["Judul"].ToString(),
                            image = reader["Image"].ToString(),
                            sinopsis = reader["Sinopsis"].ToString(),
                            pengarang = reader["Pengarang"].ToString(),
                            tahun_terbit = Convert.ToInt32(reader["Tahun_terbit"]),
                            id_kategori = Convert.ToInt32(reader["Id_kategori"]),
                            stok = Convert.ToInt32(reader["Stok"])
                        };
                        BukuList.Add(buku);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return BukuList;
    }


    public int CreateBuku(Buku buku)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO buku (judul, image, sinopsis, pengarang, tahun_terbit, id_kategori, stok) VALUES (@Judul, @Image, @Sinopsis, @Pengarang, @Tahun_terbit, @Id_kategori, @Stok)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Judul", buku.judul);
                command.Parameters.AddWithValue("@Image", buku.image);
                command.Parameters.AddWithValue("@Sinopsis", buku.sinopsis);
                command.Parameters.AddWithValue("@Pengarang", buku.pengarang);
                command.Parameters.AddWithValue("@Tahun_terbit", buku.tahun_terbit);
                command.Parameters.AddWithValue("@Id_kategori", buku.id_kategori);
                command.Parameters.AddWithValue("@Stok", buku.stok);
                

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int UpdateBuku(int id, Buku buku)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE buku SET judul = @Judul, image = @Image, sinopsis = @Sinopsis, pengarang = @Pengarang, tahun_terbit = @Tahun_terbit, id_kategori = @Id_kategori, stok = @Stok  WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Judul", buku.judul);
                command.Parameters.AddWithValue("@Image", buku.image);
                command.Parameters.AddWithValue("@Sinopsis", buku.sinopsis);
                command.Parameters.AddWithValue("@Pengarang", buku.pengarang);
                command.Parameters.AddWithValue("@Tahun_terbit", buku.tahun_terbit);
                command.Parameters.AddWithValue("@Id_kategori", buku.id_kategori);
                command.Parameters.AddWithValue("@Stok", buku.stok);
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int DeleteBuku(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "DELETE FROM buku WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
    public List<Kategori> GetAllKategori()
    {
        List<Kategori> KategoriList = new List<Kategori>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM kategori_buku";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Kategori kategori = new Kategori
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            nama_kategori = reader["Nama_kategori"].ToString()
                        };
                        KategoriList.Add(kategori);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return KategoriList;
    }

    public Kategori GetKategoriByBukuId(int bukuId)
    {
        Kategori kategori = null;
        string query = "SELECT kb.id, kb.nama_kategori " +
                    "FROM kategori_buku kb " +
                    "INNER JOIN buku b ON kb.id = b.id_kategori " +
                    "WHERE b.id = @BukuId";

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@BukuId", bukuId);

            try
            {
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        kategori = new Kategori
                        {
                            id = Convert.ToInt32(reader["id"]),
                            nama_kategori = reader["nama_kategori"].ToString()
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        return kategori;
    }

    public int CreateKategori(Kategori kategori)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "INSERT INTO kategori_buku (nama_kategori) VALUES (@Nama_kategori)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Nama_kategori", kategori.nama_kategori);
                

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int UpdateKategori(int id, Kategori kategori)
    {
        using (MySqlConnection connection = _connection)
        {
            string query = "UPDATE kategori_buku SET nama_kategori = @Nama_kategori  WHERE id = @Id";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Nama_kategori", kategori.nama_kategori);
                command.Parameters.AddWithValue("@Id", id);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public int DeleteKategori(int id)
    {
        using (MySqlConnection connection = _connection)
        {
            connection.Open();
            using (var transaction = connection.BeginTransaction())
            {
                try
                {
                    string deleteBooksQuery = "DELETE FROM buku WHERE id_kategori = @Id";
                    using (MySqlCommand deleteBooksCmd = new MySqlCommand(deleteBooksQuery, connection, transaction))
                    {
                        deleteBooksCmd.Parameters.AddWithValue("@Id", id);
                        deleteBooksCmd.ExecuteNonQuery();
                    }
                    string deleteKategoriQuery = "DELETE FROM kategori_buku WHERE id = @Id";
                    using (MySqlCommand deleteKategoriCmd = new MySqlCommand(deleteKategoriQuery, connection, transaction))
                    {
                        deleteKategoriCmd.Parameters.AddWithValue("@Id", id);
                        deleteKategoriCmd.ExecuteNonQuery();
                    }
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    Console.WriteLine(ex.Message);
                    return 0;
                }
            }
            return 1;
        }
    }

    public Member GetMemberById(int id)
    {
        Member member = null;
        string query = "SELECT * FROM member WHERE id = @Id";

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Id", id);

            try
            {
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        member = new Member
                        {
                            id = Convert.ToInt32(reader["id"]),
                            username = reader["username"].ToString(),
                            email = reader["email"].ToString(),
                            password = reader["password"].ToString(),
                            role = (UserRole)Enum.Parse(typeof(UserRole), reader["role"].ToString().Replace(" ", string.Empty), true)
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        return member;
    }

    public int CreateMember(Member member)
    {
        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            string query = "INSERT INTO member (username, email, password, role) VALUES (@Username, @Email, @Password, @Role)";
            
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Username", member.username);
                command.Parameters.AddWithValue("@Email", member.email);
                command.Parameters.AddWithValue("@Password", member.password);
                command.Parameters.AddWithValue("@Role", (int)member.role);
                
                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }

    public bool CekPeminjamanAktif(int idMember)
    {
        bool isActive = false;
        string query = "SELECT COUNT(*) FROM transaksi WHERE id_member = @IdMember AND status = 'proses', 'acc', 'late'";

        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@IdMember", idMember);

            try
            {
                connection.Open();
                int count = Convert.ToInt32(command.ExecuteScalar());
                isActive = count > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        return isActive;
    }

    public List<Transaksi> GetAllTransaksi()
    {
        List<Transaksi> TransaksiList = new List<Transaksi>();
        try
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = "SELECT * FROM transaksi";
                MySqlCommand command = new MySqlCommand(query, connection);
                connection.Open();
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Transaksi transaksi = new Transaksi
                        {
                            id = Convert.ToInt32(reader["Id"]),
                            id_buku = Convert.ToInt32(reader["Id_buku"]),
                            id_member = Convert.ToInt32(reader["Id_member"]),
                            tanggal_pinjam = Convert.ToDateTime(reader["Tanggal_pinjam"]),
                            tanggal_kembali = Convert.ToDateTime(reader["Tanggal_kembali"]),
                            status = reader["Status"].ToString()
                        };
                        TransaksiList.Add(transaksi);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return TransaksiList;
    }

    public int CreateTransaksi(Transaksi transaksi)
    {
        using (MySqlConnection connection = new MySqlConnection(connectionString))
        {
            string query = "INSERT INTO transaksi (id_buku, id_member, tanggal_pinjam, tanggal_kembali, status) " +
                           "VALUES (@Id_buku, @Id_member, @Tanggal_pinjam, @Tanggal_kembali, @Status)";
            using (MySqlCommand command = new MySqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Id_buku", transaksi.id_buku);
                command.Parameters.AddWithValue("@Id_member", transaksi.id_member);
                command.Parameters.AddWithValue("@Tanggal_pinjam", transaksi.tanggal_pinjam);
                command.Parameters.AddWithValue("@Tanggal_kembali", transaksi.tanggal_kembali);
                command.Parameters.AddWithValue("@Status", transaksi.status);

                connection.Open();
                return command.ExecuteNonQuery();
            }
        }
    }
}