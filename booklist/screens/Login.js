import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://172.30.1.70:5000/api/Login/login', {
        username,
        password,
      });

      if (response.data.success) {
        const role = response.data.role;
        const idMember = response.data.memberId; // Menggunakan memberId dari respons

        // Simpan id_member ke AsyncStorage
        if (idMember) {
          await AsyncStorage.setItem('id_member', idMember.toString());

          if (role === 'admin') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home', params: { username } }],
            });
          } else if (role === 'member') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeUser', params: { username } }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeUser', params: { username } }],
            });
          }
        } else {
          Alert.alert('Error', 'Login berhasil tetapi tidak mendapatkan id member.');
        }
      } else {
        Alert.alert('Gagal Masuk', 'Username atau password salah.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Gagal masuk. Silakan coba lagi.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={require('../assets/kucing.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.header}>Masuk</Text>

          <TextInput
            style={styles.input}
            placeholder="Nama Pengguna"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Kata Sandi"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Masuk" onPress={handleLogin} />

          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Belum punya akun? Daftar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(45, 133, 200, 0.4)',
    padding: 30,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: 200,
    margin: 10,
    padding: 3,
    backgroundColor: 'rgba(45, 133, 152, 0.6)',
    borderRadius: 5,
    color: 'white',
  },
  signUpText: {
    marginTop: 10,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default Login;
