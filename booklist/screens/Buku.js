import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const Buku = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { kategoriId } = route.params;
  const [bukuList, setBukuList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBukuList, setFilteredBukuList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBukuData();
  }, [kategoriId]);

  useEffect(() => {
    filterBukuList();
  }, [searchQuery, bukuList]);

  const fetchBukuData = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(`http://172.30.1.70:5000/BukuByKategori/${kategoriId}`);
      setBukuList(response.data.data);
      filterBukuList(response.data.data);
    } catch (error) {
      console.error('Error fetching buku data: ', error);
      Alert.alert('Kesalahan', 'Gagal mengambil data buku. Silakan coba lagi nanti.');
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const filterBukuList = () => {
    if (!searchQuery) {
      setFilteredBukuList(bukuList);
      return;
    }
    const filteredList = bukuList.filter(buku =>
      buku.judul.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBukuList(filteredList);
  };

  const navigateToDetail = (item) => {
    navigation.navigate('BukuDetail', { buku: item });
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchBukuData();
  };

  return (
    <ImageBackground source={require('../assets/r.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Daftar Buku</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Buku"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={30} color="#1E90FF" />
          </TouchableOpacity>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <FlatList
            data={filteredBukuList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToDetail(item)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.judul}>{item.judul}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.bukuList}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
        <View style={styles.iconButtons}>
          <TouchableOpacity onPress={handleRefresh}>
            <Icon name="refresh" size={40} color="#1E90FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddBuku', { kategoriId })}>
            <Icon name="add-circle" size={40} color="#1E90FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={40} color="#1E90FF" />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    marginLeft: 10,
  },
  bukuList: {
    flexGrow: 1,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'rgba(45, 133, 200, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 12,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  judul: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f0f0f0',
    textAlign: 'center',
  },
  iconButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default Buku;
