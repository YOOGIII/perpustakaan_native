import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const BukuDetail = ({ route }) => {
  const { buku } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id, judul) => {
    Alert.alert(
      'Konfirmasi Hapus',
      `Apakah Anda yakin ingin menghapus buku ${judul}?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await axios.delete(`http://172.30.1.70:5000/api/Buku/Buku/delete/${id}`);
              Alert.alert('Sukses', `${judul} berhasil dihapus.`);
              navigation.navigate('Buku', { kategoriId: buku.id_kategori });
            } catch (error) {
              console.error('Error deleting buku data: ', error);
              Alert.alert('Error', 'Gagal menghapus data buku. Silakan coba lagi nanti.');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const navigateToUpdate = () => {
    navigation.navigate('EditBuku', { buku });
  };

  return (
    <ImageBackground source={require('../assets/a.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: buku.image }} style={styles.image} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <Text style={styles.judul}>{buku.judul}</Text>
          <View style={styles.detailSection}>
            <Text style={styles.label}>Sinopsis:</Text>
            <Text style={styles.description}>{buku.sinopsis}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.label}>Pengarang:</Text>
            <Text style={styles.description}>{buku.pengarang}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.label}>Tahun Terbit:</Text>
            <Text style={styles.description}>{buku.tahun_terbit}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.label}>Id Kategori:</Text>
            <Text style={styles.description}>{buku.id_kategori}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.label}>Stok:</Text>
            <Text style={styles.description}>{buku.stok}</Text>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Buku', { kategoriId: buku.id_kategori })}>
            <Icon name="home" size={25} color="#1E90FF" />
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToUpdate}>
            <Icon name="create" size={25} color="#1E90FF" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleDelete(buku.id, buku.judul)}>
            <Icon name="trash" size={25} color="red" />
            <Text style={[styles.buttonText, { color: 'red' }]}>Hapus</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  judul: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailSection: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#1E90FF',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default BukuDetail;
