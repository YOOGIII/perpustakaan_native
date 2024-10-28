import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { registerForPushNotificationsAsync, schedulePushNotification } from './notificationsService';

const AddBuku = ({ navigation }) => {
  const route = useRoute();
  const { kategoriId } = route.params;

  const [judul, setJudul] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [pengarang, setPengarang] = useState('');
  const [tahun_terbit, setTahunTerbit] = useState('');
  const [stok, setStok] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleAddBuku = async () => {
    if (!judul.trim() || !imageURL.trim() || !sinopsis.trim() || !pengarang.trim() || !tahun_terbit.trim() || !kategoriId || !stok.trim()) {
      Alert.alert('Error', 'Silakan isi semua kolom');
      return;
    }

    try {
      await axios.post('http://172.30.1.70:5000/Buku/post', {
        judul: judul.trim(),
        image: imageURL.trim(),
        sinopsis: sinopsis.trim(),
        pengarang: pengarang.trim(),
        tahun_terbit: tahun_terbit.trim(),
        id_kategori: kategoriId,
        stok: stok.trim(),
      });

      await schedulePushNotification('Sukses', 'Buku berhasil ditambahkan');
      Alert.alert('Sukses', 'Buku berhasil ditambahkan');
      navigation.navigate('Buku', { kategoriId });
    } catch (error) {
      console.error('Error adding buku: ', error);
      Alert.alert('Error', 'Gagal menambahkan buku. Silakan coba lagi nanti.');
    }
  };

  return (
    <ImageBackground source={require('../assets/bgu.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Tambah Buku Baru</Text>
        <TextInput
          style={styles.input}
          value={judul}
          onChangeText={setJudul}
          placeholder="Judul Buku"
          placeholderTextColor="dark-gray"
        />
        <TextInput
          style={styles.input}
          value={imageURL}
          onChangeText={setImageURL}
          placeholder="URL Gambar"
          placeholderTextColor="dark-gray"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          value={sinopsis}
          onChangeText={setSinopsis}
          placeholder="Sinopsis"
          placeholderTextColor="dark-gray"
          multiline
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          value={pengarang}
          onChangeText={setPengarang}
          placeholder="Pengarang"
          placeholderTextColor="dark-gray"
        />
        <TextInput
          style={styles.input}
          value={tahun_terbit}
          onChangeText={setTahunTerbit}
          placeholder="Tahun Terbit"
          placeholderTextColor="dark-gray"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={stok}
          onChangeText={setStok}
          placeholder="Stok"
          placeholderTextColor="dark-gray"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBuku}>
          <Text style={styles.addButtonText}>Tambah Buku</Text>
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

export default AddBuku;
