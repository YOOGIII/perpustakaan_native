import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const navigation = useNavigation();
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchKategoriData();
  }, []);

  const fetchKategoriData = async () => {
    try {
      const response = await axios.get('http://172.30.1.70:5000/Kategori');
      setKategoriList(response.data.data);
    } catch (error) {
      console.error('Error fetching kategori data: ', error);
      Alert.alert('Error', 'Gagal mengambil data kategori. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchKategoriData();
  };

  const navigateToBooks = (kategoriId) => {
    navigation.navigate('Buku', { kategoriId });
  };

  const navigateToEdit = (kategoriId) => {
    navigation.navigate('EditKategori', { kategoriId });
  };

  const handleDelete = (kategoriId, namaKategori) => {
    Alert.alert(
      'Konfirmasi Hapus',
      `Anda yakin ingin menghapus ${namaKategori}?`,
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
              setDeleting(true);
              await axios.delete(`http://172.30.1.70:5000/api/Kategori/Kategori/delete/${kategoriId}`);
              setKategoriList(kategoriList.filter(item => item.id !== kategoriId));
              Alert.alert('Sukses', `${namaKategori} berhasil dihapus.`);
            } catch (error) {
              console.error('Error deleting kategori: ', error);
              Alert.alert('Error', 'Gagal menghapus kategori. Silakan coba lagi nanti.');
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const navigateToAddKategori = () => {
    navigation.navigate('AddKategori');
  };

  return (
    <ImageBackground source={require('../assets/d.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>PustakaKu</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.kategoriContainer}>
              {kategoriList.map((item) => (
                <View key={item.id} style={styles.item}>
                  <Text style={styles.judul}>{item.nama_kategori}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => navigateToBooks(item.id)}
                    >
                      <Icon name="book" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => navigateToEdit(item.id)}
                    >
                      <Icon name="edit" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleDelete(item.id, item.nama_kategori)}
                    >
                      <Icon name="delete" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddKategori}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          {refreshing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Icon name="refresh" size={30} color="#fff" />
          )}
        </TouchableOpacity>
        {deleting && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
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
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  kategoriContainer: {
    width: '100%',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  item: {
    width: '90%',
    marginVertical: 10,
    backgroundColor: 'rgba(45, 133, 200, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: 'rgba(46, 204, 113, 0.8)',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'rgba(231, 76, 60, 0.8)',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Home;
