import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeUser = () => {
  const navigation = useNavigation();
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }
  };

  const navigateToBooks = (kategoriId) => {
    navigation.navigate('BukuUser', { kategoriId });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
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
                <TouchableOpacity key={item.id} style={styles.item} onPress={() => navigateToBooks(item.id)}>
                  <Text style={styles.judul}>{item.nama_kategori}</Text>
                  <View style={styles.buttonContainer}>
                    <Icon name="book" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
          <Icon name="account-circle" size={30} color="#fff" />
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
  profileButton: {
    position: 'absolute',
    top: 45,
    right: 90,
    backgroundColor: 'rgba(45, 133, 200, 0.8)',
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
});

export default HomeUser;
