import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const idMember = await AsyncStorage.getItem('id_member');
      if (idMember) {
        const response = await axios.get(`http://172.30.1.70:5000/api/Member/${idMember}`);
        console.log('Response data:', response.data); // Log the response data
        if (response.data.success) {
          setProfileData(response.data.member);
        } else {
          Alert.alert('Error', 'Data profil tidak ditemukan. Silakan coba lagi nanti.');
        }
      } else {
        Alert.alert('Error', 'Tidak dapat menemukan id member. Silakan login kembali.');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error', 'Gagal mengambil data profil. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/d.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Profil Saya</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : profileData ? (
          <View style={styles.profileContainer}>
            {/* Static Cartoon Profile Image */}
            <Image
              source={require('../assets/p.jpg')} // Replace with your cartoon avatar image
              style={styles.avatar}
            />
            {/* Dynamic Data from Database */}
            <Text style={styles.label}>ID: {profileData.id}</Text>
            <Text style={styles.label}>Username: {profileData.username}</Text>
            <Text style={styles.label}>Email: {profileData.email}</Text>
            {/* Hide password for security reasons */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.errorText}>Gagal mengambil data profil. Silakan coba lagi nanti.</Text>
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
  profileContainer: {
    width: '90%',
    backgroundColor: 'rgba(45, 133, 200, 0.6)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
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
  errorText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Profile;
