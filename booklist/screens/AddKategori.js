import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { registerForPushNotificationsAsync, schedulePushNotification } from './notificationsService';

const AddKategori = ({ navigation }) => {
  const [nama_kategori, setNamaKategori] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleAddKategori = async () => {
    if (!nama_kategori.trim()) {
      Alert.alert('Error', 'Silakan isi semua kolom');
      return;
    }

    try {
      await axios.post('http://172.30.1.70:5000/Kategori/post', {
        nama_kategori: nama_kategori.trim(),
      });

      await schedulePushNotification('Sukses', 'Kategori berhasil ditambahkan');
      Alert.alert('Sukses', 'Kategori berhasil ditambahkan');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding nama_kategori: ', error);
      Alert.alert('Error', 'Gagal menambahkan nama_kategori. Silakan coba lagi nanti.');
    }
  };

  return (
    <ImageBackground source={require('../assets/bgu.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Tambah Kategori Baru</Text>
        <TextInput
          style={styles.input}
          value={nama_kategori}
          onChangeText={setNamaKategori}
          placeholder="Nama Kategori"
          placeholderTextColor="dark-gray"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddKategori}>
          <Text style={styles.addButtonText}>Tambah Kategori</Text>
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

export default AddKategori;
