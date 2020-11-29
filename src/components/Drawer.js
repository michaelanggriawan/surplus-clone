import React, { useContext } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { AsyncStorage } from 'react-native';

// screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';

import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';

import rootContext from '../context/globalAccess';

const Drawer = createDrawerNavigator();
const StorageKey = '@token';

const config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  clientId:
    '407755949512-530jj3vmio80hh8i3qvj26dqv1q9qo25.apps.googleusercontent.com',
};

function CustomDrawerContent(props) {
  const context = useContext(rootContext);

  const googleSignOutAsync = async ({ accessToken }) => {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true,
      });
      context.dispatch.setIsSignedIn(false);
      context.dispatch.setAuthState(null);
      await AsyncStorage.removeItem(StorageKey);
      return null;
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    }
  };

  const facebookSignOutAsync = async () => {
    await Facebook.initializeAsync({
      appId: '388343699048340',
    });
    await AsyncStorage.removeItem(StorageKey);
    await Facebook.logOutAsync();
    context.dispatch.setIsSignedIn(false);
    context.dispatch.setAuthState(null);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={() => {
          if (context.authState.accessToken) {
            googleSignOutAsync(context.authState);
          } else {
            facebookSignOutAsync();
          }
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerMenu() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          title: 'Daftar Makanan',
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
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          title: 'Profile',
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
    </Drawer.Navigator>
  );
}
