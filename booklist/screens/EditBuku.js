import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const EditBuku = ({ route, navigation }) => {
  const { buku } = route.params;
  const [newJudul, setNewJudul] = useState(buku.judul);
  const [newSinopsis, setNewSinopsis] = useState(buku.sinopsis);
  const [newPengarang, setNewPengarang] = useState(buku.pengarang);
  const [newTahunTerbit, setNewTahunTerbit] = useState(buku.tahun_terbit.toString());
  const [newIdKategori, setNewIdKategori] = useState(buku.id_kategori.toString());
  const [newStok, setNewStok] = useState(buku.stok.toString());

  const handleUpdate = async () => {
    try {
      const updatedBuku = {
        ...buku,
        judul: newJudul,
        sinopsis: newSinopsis,
        pengarang: newPengarang,
        tahun_terbit: newTahunTerbit,
        id_kategori: newIdKategori,
        stok: newStok,
      };

      await axios.put(`http://172.30.1.70:5000/api/Buku/Buku/update/${buku.id}`, updatedBuku);
      navigation.navigate('Buku', { kategoriId: buku.id_kategori }); // Kembali ke halaman Buku setelah berhasil update
    } catch (error) {
      console.error('Error updating buku data: ', error);
      Alert.alert('Error', 'Gagal memperbarui data buku. Silakan coba lagi nanti.');
    }
  };

  return (
    <ImageBackground source={require('../assets/bgu.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Buku</Text>
        <TextInput
          style={styles.input}
          value={newJudul}
          onChangeText={setNewJudul}
          placeholder="Masukkan Judul"
          placeholderTextColor="dark-gray"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          value={newSinopsis}
          onChangeText={setNewSinopsis}
          placeholder="Masukkan Sinopsis"
          placeholderTextColor="dark-gray"
          multiline
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          value={newPengarang}
          onChangeText={setNewPengarang}
          placeholder="Masukkan Pengarang"
          placeholderTextColor="dark-gray"
        />
        <TextInput
          style={styles.input}
          value={newTahunTerbit}
          onChangeText={setNewTahunTerbit}
          placeholder="Masukkan Tahun Terbit"
          placeholderTextColor="dark-gray"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={newIdKategori}
          onChangeText={setNewIdKategori}
          placeholder="Masukkan Id Kategori"
          placeholderTextColor="dark-gray"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={newStok}
          onChangeText={setNewStok}
          placeholder="Masukkan Stok"
          placeholderTextColor="dark-gray"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleUpdate}>
          <Text style={styles.addButtonText}>Perbarui Buku</Text>
        </TouchableOpacity>
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'stretch',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditBuku;
