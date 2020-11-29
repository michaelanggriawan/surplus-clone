import React, { useEffect, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import rootContext from '../context/globalAccess';

import Register from '../screens/Register';
import Email from '../screens/Email';
import Login from '../screens/Login';
import EmailLogin from '../screens/EmailLogin';
import DrawerMenu from '../components/Drawer';

const Stack = createStackNavigator();
const StorageKey = '@token';

export default function RooStack() {
  const context = useContext(rootContext);

  // check if user has logged in
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(StorageKey);
      if (value) {
        context.dispatch.setIsSignedIn(true);
      }
    })();
  }, []);
  
  return (
    <Stack.Navigator>
      {context.isSignedIn ? (
        <>
          <Stack.Screen
            name="Drawer"
            component={DrawerMenu}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Email"
            component={Email}
            options={{
              title: 'Daftar',
              headerStyle: {
                backgroundColor: '#01796f',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EmailLogin"
            component={EmailLogin}
            options={{
              title: 'Masuk',
              headerStyle: {
                backgroundColor: '#01796f',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
