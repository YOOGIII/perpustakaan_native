import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const EditKategori = ({ route, navigation }) => {
  const { kategoriId, nama_kategori } = route.params;
  const [newNamaKategori, setNewNamaKategori] = useState(nama_kategori);

  const handleUpdate = async () => {
    if (!newNamaKategori.trim()) {
      Alert.alert('Error', 'Silakan isi nama kategori');
      return;
    }

    try {
      const updatedKategori = {
        nama_kategori: newNamaKategori.trim(),
      };

      await axios.put(`http://172.30.1.70:5000/api/Kategori/Kategori/update/${kategoriId}`, updatedKategori);
      Alert.alert('Sukses', 'Kategori berhasil diperbarui');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating kategori data: ', error);
      Alert.alert('Error', 'Gagal memperbarui data kategori. Silakan coba lagi nanti.');
    }
  };

  return (
    <ImageBackground source={require('../assets/bgu.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Kategori</Text>
        <TextInput
          style={styles.input}
          value={newNamaKategori}
          onChangeText={setNewNamaKategori}
          placeholder="Nama Kategori"
          placeholderTextColor="dark-gray"
        />
        <TouchableOpacity style={styles.editButton} onPress={handleUpdate}>
          <Text style={styles.editButtonText}>Perbarui Kategori</Text>
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
  editButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'stretch',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditKategori;
