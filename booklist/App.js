import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { UserProvider } from './user/UserContext';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Buku from './screens/Buku';
import BukuDetail from './screens/BukuDetail'; 
import AddBuku from './screens/AddBuku'; 
import EditBuku from './screens/EditBuku';
import AddKategori from './screens/AddKategori';
import EditKategori from './screens/EditKategori';
import HomeUser from './user/HomeUser';
import BukuUser from './user/BukuUser';
import BukuDetailUser from './user/BukuDetailUser';
import Pinjam from './user/Pinjam';
import Profile from './user/Profile';

const Stack = createStackNavigator();

const App = () => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Listener untuk notifikasi saat aplikasi dalam keadaan foreground
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Listener untuk respon pengguna terhadap notifikasi
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const settings = await Notifications.getPermissionsAsync();
      if (!settings.granted) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission not granted');
        }
      }
    } catch (error) {
      console.error('Error getting notification permissions:', error);
    }
  };

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Buku" component={Buku} />
          <Stack.Screen name="BukuDetail" component={BukuDetail} />
          <Stack.Screen name="AddBuku" component={AddBuku} />
          <Stack.Screen name="EditBuku" component={EditBuku} />
          <Stack.Screen name="AddKategori" component={AddKategori} />
          <Stack.Screen name="EditKategori" component={EditKategori} />
          <Stack.Screen name="HomeUser" component={HomeUser} />
          <Stack.Screen name="BukuUser" component={BukuUser} />
          <Stack.Screen name="BukuDetailUser" component={BukuDetailUser} />
          <Stack.Screen name="Pinjam" component={Pinjam} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
