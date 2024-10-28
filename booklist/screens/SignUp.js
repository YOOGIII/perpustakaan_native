import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    // Validasi form harus diisi
    if (!username || !email || !password) {
      setErrorMessage('Semua kolom harus diisi.');
      return;
    }

    // Validasi email harus berbentuk email
    if (!validateEmail(email)) {
      setErrorMessage('Email tidak valid. Mohon periksa kembali.');
      return;
    }

    try {
      const response = await axios.post('http://172.30.1.70:5000/api/Member/post', {
        username,
        email,
        password,
        role: 3, // Set role to 3 for non-member (integer)
      });

      // Handle success case
      setErrorMessage('');
      navigation.navigate('Login');
    } catch (error) {
      // Handle error case
      console.error('Error signing up:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Ada masalah dengan data yang dikirim. Mohon cek kembali.');
      } else {
        setErrorMessage('Gagal membuat akun. Silakan coba lagi.');
      }
    }
  };

  // Function untuk validasi email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <ImageBackground source={require('../assets/kucing.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.signupBox}>
          <Text style={styles.header}>Daftar</Text>

          <TextInput
            style={styles.input}
            placeholder="Nama Pengguna"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address" // Keyboard type email-address
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Kata Sandi"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Sudah punya akun? Masuk</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupBox: {
    backgroundColor: 'rgba(45, 133, 200, 0.4)',
    padding: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(45, 133, 152, 0.6)',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: 'white'
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
