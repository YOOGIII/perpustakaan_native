import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground, ActivityIndicator, Platform, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { schedulePushNotification } from '../screens/notificationsService'; // Pastikan import sesuai dengan path Anda

const Pinjam = ({ route }) => {
  const { buku } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [idMember, setIdMember] = useState('');
  const [tanggalPinjam, setTanggalPinjam] = useState(new Date());
  const [tanggalKembali, setTanggalKembali] = useState(new Date());
  const [showTanggalPinjam, setShowTanggalPinjam] = useState(false);
  const [showTanggalKembali, setShowTanggalKembali] = useState(false);
  const [riwayatPeminjaman, setRiwayatPeminjaman] = useState([]);

  const handlePinjam = async () => {
    if (!idMember || !tanggalPinjam || !tanggalKembali) {
      Alert.alert('Error', 'Silakan isi semua kolom');
      return;
    }
  
    setLoading(true);
    try {
      // Ambil data member berdasarkan idMember
      console.log(`Mengambil data member untuk id: ${idMember}`);
      const memberResponse = await axios.get(`http://172.30.1.70:5000/api/Member/${idMember}`);
      const memberData = memberResponse.data;
      console.log(`Data member: ${JSON.stringify(memberData)}`);
  
      // Menghitung selisih waktu antara tanggal kembali dan tanggal pinjam dalam hari
      const timeDiff = Math.abs(tanggalKembali - tanggalPinjam);
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      console.log(`Selisih hari: ${diffDays}`);
  
      // Tambahkan log untuk nilai role
      console.log(`Role member: ${memberData.member.role}`);
  
      // Tentukan durasi peminjaman berdasarkan role
      let maxDays = 0;
      if (memberData.member.role === 2) {
        maxDays = 30; // Maksimal 1 bulan
      } else if (memberData.member.role === 3) {
        maxDays = 14; // Maksimal 2 minggu
      } else {
        Alert.alert('Gagal', 'ID tidak ditemukan');
        return;
      }
  
      if (diffDays > maxDays) {
        Alert.alert('Gagal', `Maksimum peminjaman adalah ${maxDays} hari`);
        return;
      }
  
      const requestBody = {
        id_buku: buku.id,
        id_member: idMember,
        tanggal_pinjam: tanggalPinjam.toISOString().split('T')[0],
        tanggal_kembali: tanggalKembali.toISOString().split('T')[0],
        status: 'proses'
      };
      console.log(`Mengirim data peminjaman: ${JSON.stringify(requestBody)}`);
  
      // Kirim permintaan POST untuk membuat transaksi baru
      await axios.post('http://172.30.1.70:5000/api/Transaksi', requestBody);
      console.log('Transaksi berhasil diajukan');
  
      // Kurangi stok buku di backend
      await axios.put(`http://172.30.1.70:5000/api/Buku/Buku/update/${buku.id}`, {
        stok: buku.stok - 1
      });
      console.log('Stok buku berhasil dikurangi');
  
      // Setelah berhasil, jadwalkan notifikasi
      await schedulePushNotification('Sukses', 'Berhasil, silahkan datang sesuai tanggal pengajuan peminjaman anda!.');
  
      // Navigasi kembali ke halaman buku dengan kategori yang sama
      navigation.navigate('BukuUser', { kategoriId: buku.id_kategori });
    } catch (error) {
      console.error('Kesalahan saat mengajukan peminjaman:', error);
      // Periksa apakah ada respons dari server
      if (error.response) {
        // Server merespons dengan status kode yang bukan 2xx
        Alert.alert('Error', `Terjadi kesalahan saat mengajukan peminjaman. ${error.response.data.message}`);
      } else if (error.request) {
        // Permintaan dibuat tetapi tidak ada respons
        Alert.alert('Error', 'Tidak ada respons dari server. Silakan periksa koneksi internet Anda atau coba lagi nanti.');
      } else {
        // Terjadi kesalahan saat mengatur permintaan
        Alert.alert('Error', 'Terjadi kesalahan saat mengajukan peminjaman.');
      }
    } finally {
      setLoading(false);
    }
  };  

  const onChangeTanggalPinjam = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalPinjam;
    setShowTanggalPinjam(Platform.OS === 'ios');
    setTanggalPinjam(currentDate);
  };

  const onChangeTanggalKembali = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalKembali;
    setShowTanggalKembali(Platform.OS === 'ios');
    setTanggalKembali(currentDate);
  };

  return (
    <ImageBackground source={require('../assets/bgu.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Form Peminjaman</Text>
        <Text style={styles.label}>ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan id Anda"
          placeholderTextColor="dark-gray"
          value={idMember}
          onChangeText={setIdMember}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Tanggal Pinjam:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowTanggalPinjam(true)}>
          <Text style={styles.dateText}>{tanggalPinjam.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showTanggalPinjam && (
          <Modal transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <DateTimePicker
                  value={tanggalPinjam}
                  mode="date"
                  display="default"
                  onChange={onChangeTanggalPinjam}
                />
                <Button title="Pilih Tanggal" onPress={() => setShowTanggalPinjam(false)} />
              </View>
            </View>
          </Modal>
        )}
        <Text style={styles.label}>Tanggal Kembali:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowTanggalKembali(true)}>
          <Text style={styles.dateText}>{tanggalKembali.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showTanggalKembali && (
          <Modal transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <DateTimePicker
                  value={tanggalKembali}
                  mode="date"
                  display="default"
                  onChange={onChangeTanggalKembali}
                />
                <Button title="Pilih Tanggal" onPress={() => setShowTanggalKembali(false)} />
              </View>
            </View>
          </Modal>
        )}
        <TouchableOpacity style={styles.button} onPress={handlePinjam}>
          <Text style={styles.buttonText}>Pinjam</Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1E90FF" />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  backButton: {
    top: 30,
    left: 10,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'rgba(45, 133, 200, 0.7)',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(45, 133, 200, 0.2)',
    color: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  dateButton: {
    height: 40,
    borderColor: 'rgba(45, 133, 200, 0.7)',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(45, 133, 200, 0.2)',
  },
  dateText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Pinjam;
