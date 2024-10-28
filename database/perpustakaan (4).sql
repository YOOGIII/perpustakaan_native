-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 28, 2024 at 04:48 AM
-- Server version: 11.4.2-MariaDB-log
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan`
--

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `sinopsis` varchar(1000) NOT NULL,
  `pengarang` varchar(255) NOT NULL,
  `tahun_terbit` int(11) NOT NULL,
  `id_kategori` int(11) DEFAULT NULL,
  `stok` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id`, `judul`, `image`, `sinopsis`, `pengarang`, `tahun_terbit`, `id_kategori`, `stok`, `updated_at`) VALUES
(3, 'BUMI MANUSIA', 'https://cdn.gramedia.com/uploads/items/bumi-manusia-edit.jpg', 'Bumi Manusia adalah salah satu karya besar dalam ranah sastra Indonesia, diciptakan oleh seorang sastrawan tanah air yang memang mengabdikan diri dan hidupnya untuk membuat sebuah rencana keabadian. Beliau adalah Pramoedya Ananta Toer, atau yang akrab disapa Pram. Pram menjadi satu-satunya sastrawan asal Indonesia yang pernah dinominasikan sebanyak enam kali sebagai peraih nobel perdamaian pada masanya itu.', 'Pramoedya Ananta Toer', 1980, 2, 2, '2024-07-30 07:03:22'),
(4, 'HAPHEPOBHIA', 'https://www.kubusmedia.co.id/wp-content/uploads/2018/04/cover-haphephobia.jpg', '10 tahun berlalu, di usia ke-26 Iluka masih trauma dan divonis mengidap phobia disentuh atau lebih dikenal haphephobia. Iluka selalu menutup diri. Dia tidak mau berdekatan apalagi bersentuhan dengan siapa pun walau dengan rekan kantornya. Sayangnya, kehidupan damai Iluka runtuh saat Neo Erlando, atasannya tahu tentang phobia Iluka. Sengaja, Neo selalu cari cara untuk menyentuh Iluka bahkan membuat wanita itu pingsan berkali-kali karena perbuatan usilnya.', 'Queen Nakey', 2018, 2, 5, '2024-10-03 13:06:20'),
(5, 'B4', 'https://static.buku.kemdikbud.go.id/content/image/coverteks/coverkurikulum21/Bermain%20Berbasis%20Buku-PAUD-COVER.png', 'Belajar, dan Bermain Berbasis Buku, buku ini diciptakan untuk anak-anak dari umur 4 sampai umur 6 tahun', 'Arleen Amidjaja', 2021, 1, 5, '2024-07-30 06:43:45'),
(6, 'TRUE BEAUTY', 'https://m.media-amazon.com/images/I/81w8BzflSzL._AC_UF1000,1000_QL80_.jpg', 'Jugyeong Lim telah diperlakukan tidak adil oleh keluarganya dan dirundung oleh musuh-musuhnya karena dianggap jelek. Ia belajar cara menggunakan riasan dengan menonton tutorial Youtube secara maraton. Saat ia perlahan menguasai seni merias wajah, transformasi dramatisnya membawanya pada popularitas dan ketenaran yang luar biasa.', 'Yaongyi', 2022, 3, 3, '2024-07-11 06:46:17'),
(9, 'HELLO', 'https://cdn.gramedia.com/uploads/picture_meta/2023/4/10/5cavrpibsar2kwtnhhbh7p.jpg', 'KISAH DISAH ini sudah tertinggal puluhan tahun lebih. Maka ibarat seseorang yang ketinggalan kereta, bukan cuma kilau lampu dan getar rel yang telah hilang di tikungan sana, bahkan gerbong dan lokomotifnya sudah karatan dipensiunkan.', 'Sabak Grip', 2023, 2, 1, NULL),
(11, 'BERSERK', 'https://cdn.myanimelist.net/images/manga/1/157897.jpg', 'Guts, mantan tentara bayaran yang kini dikenal sebagai \"Black Swordsman,\" bertekad membalas dendam. Setelah masa kecil yang penuh gejolak, ia akhirnya menemukan seseorang yang ia hormati dan percayai dapat ia percaya, tetapi semuanya hancur berantakan saat orang ini mengambil semua hal penting bagi Guts demi memenuhi keinginannya sendiri. Kini telah ditetapkan untuk mati, Guts dikutuk untuk menjalani nasib yang membuatnya dikejar tanpa henti oleh makhluk-makhluk jahat.', 'Miura', 1989, 4, 1, '2024-07-10 19:30:42'),
(12, 'JoJo', 'https://cdn.myanimelist.net/images/manga/3/179882.jpg', 'Di Amerika Serikat, perlombaan terbesar di dunia akan segera dimulai. Ribuan orang mengantre di San Diego untuk menempuh jarak lebih dari enam ribu kilometer demi kesempatan memenangkan hadiah utama sebesar lima puluh juta dolar. Dengan berakhirnya era kuda, para kontestan diizinkan menggunakan kendaraan apa pun yang mereka inginkan. Para kontestan harus bertahan dalam kondisi yang melelahkan, menempuh jarak hingga seratus kilometer sehari melalui tanah tandus yang belum dipetakan. Steel Ball Run benar-benar acara yang unik.', 'Araki', 2004, 4, 1, NULL),
(13, 'Vagabond', 'https://cdn.myanimelist.net/images/manga/1/259070.jpg', 'Di Jepang abad ke-16, Shinmen Takezou adalah seorang pemuda yang liar dan kasar, baik dalam penampilan maupun tindakannya. Sifat agresifnya telah membuatnya mendapat celaan kolektif dan ketakutan dari desanya, yang menyebabkan dia dan sahabatnya, Matahachi Honiden, melarikan diri untuk mencari sesuatu yang lebih besar daripada kehidupan provinsi. Keduanya mendaftar di pasukan Toyotomi, mendambakan kejayaan—tetapi ketika Toyotomi menderita kekalahan telak di tangan Klan Tokugawa dalam Pertempuran Sekigahara, kedua sahabat itu nyaris tidak berhasil keluar hidup-hidup.', 'Inoue', 1998, 4, 1, NULL),
(15, 'MTK 5', 'https://www.bestchoicebookstore.com/wp-content/uploads/2022/05/Matematika-Vol-1-BS-KLS-V-cover.png', 'buku matematika vol 1 untuk kelas 5 sekolah dasar', 'KEMENDIKBUD', 2013, 1, 2, NULL),
(16, 'AGAMA HINDU', 'https://static.buku.kemdikbud.go.id/content/image/coverteks/coverkurikulum21/Hindu-BS-KLS-I-Cover.png', 'buku pendidikan agama hindu dan budi pekerti untuk kelas 1 sekolah dasar', 'KEMENDIKBUD', 2021, 1, 2, NULL),
(17, 'IPAS', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQgrDx5k8_EJCSJt5lZaMWciysXsrlIQdXzkPcvAW-iUVpQKrdwYUHp8rkJzjerIBk5A4jC7omb8V68MFHK9CxN7FN9R_EYnb-1Fzd83mlUOC42XdVCec-lJzsS3DB78yGzN0AvstNqbt76jRn_jbKBOWo4nCmcYw-EZgKNg0_w6xIjBOsds_L6tBdy3k/s1024/IPAS-BG-KLS-V-cover.png', 'buku ilmu pengetahuan alam dan sosial untk pendidikan sekolah dasar kelas 5', 'KEMENDIKBUD', 2020, 1, 1, NULL),
(19, 'A Returner\'s Magic Should Be Special', 'https://a.storyblok.com/f/178900/960x1440/14d9689a9d/returners-magic-vol-1.jpg', 'Manhwa A Returner’s Magic Should Be Special yang dibuat oleh komikus bernama Usonan (???) ini bercerita tentang Selama 10 tahun, keajaiban ajaib Desir dan kelompoknya telah bertarung di dalam Labirin Bayangan yang misterius—dan melawan akhir dunia. Sebagian besar umat manusia telah binasa dan saat Desir akan dibunuh, dia dikirim kembali ke 13 tahun yang lalu. Meski mengetahui masa depan terkutuk yang terbentang di depan, Desir menguatkan tekadnya saat dia melihat peluang untuk melatih teman-temannya dan mempersiapkan diri lebih baik untuk menghadapi Armageddon bersama, tanpa kehilangan orang yang mereka cintai.', 'Usonan', 2018, 3, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_buku`
--

CREATE TABLE `kategori_buku` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `kategori_buku`
--

INSERT INTO `kategori_buku` (`id`, `nama_kategori`) VALUES
(1, 'Pelajaran'),
(2, 'Novel'),
(3, 'Manhwa'),
(4, 'Manga'),
(9, 'Horror');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','member','non member') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'yogi', 'yogi@gmail.com', '123', 'admin'),
(2, 'ilham', 'ilham@gmail.com', '456', 'admin'),
(3, 'dika', 'dika@gmail.com', '789', 'member'),
(4, 'y', 'y@gmail.com', '123', 'admin'),
(7, 'faizah', 'faizah@gmail.com', '789', 'member'),
(8, 'david', 'david@gmail.com', '123', 'member'),
(9, 'dina', 'din@gmail.com', 'dina123', 'non member'),
(10, 'faisal', 'f@gmail.com', 'faisal123', 'member'),
(12, 'yogi2', 'yogi2@gmail.com', '123', 'non member'),
(14, 'rafly', 'rafly@gmail.com', '123', 'non member');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_06_28_011044_create_products_table', 1),
(6, '2024_06_28_040050_add_description_column_in_products_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `id_buku` int(11) DEFAULT NULL,
  `id_member` int(11) DEFAULT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `id_buku`, `id_member`, `tanggal_pinjam`, `tanggal_kembali`, `status`, `updated_at`, `created_at`) VALUES
(20, 4, 2, '2024-10-04', '2024-10-04', 'proses', '2024-10-03 20:19:43', '2024-10-03 13:06:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, '', 'yogi@yahoo.com', NULL, '123', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `kategori_buku`
--
ALTER TABLE `kategori_buku`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_sku_index` (`sku`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_buku` (`id_buku`),
  ADD KEY `id_member` (`id_member`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategori_buku`
--
ALTER TABLE `kategori_buku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_buku` (`id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_buku`) REFERENCES `buku` (`id`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `member` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
