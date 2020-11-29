import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Button from '../core-ui/Button';
import rootContext from '../context/globalAccess';
import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';

const config = {
  issuer: 'https://accounts.google.com',
  scopes: ['profile'],
  clientId:
    '407755949512-530jj3vmio80hh8i3qvj26dqv1q9qo25.apps.googleusercontent.com',
};

const StorageKey = '@token';

export default function Register({ navigation }) {
  const { dispatch, authState } = useContext(rootContext);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        dispatch.setIsSignedIn(true);
        dispatch.setAuthState(cachedAuth);
      }
    })();
  }, []);

  /* Google authentication */
  const signInAsync = async () => {
    let authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    return authState;
  };

  const getCachedAuthAsync = async () => {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    if (authState) {
      if (isTokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }

    return null;
  };

  const isTokenExpired = ({ expiredTokenDate }) => {
    return new Date(expiredTokenDate) < new Date();
  };

  const refreshAuthAsync = async ({ refreshToken }) => {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    await cacheAuthAsync(authState);
    return authState;
  };

  const cacheAuthAsync = async (authState) => {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  };

  /* Facebook authentication */
  const logInWithFacebookAsync = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '388343699048340',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`,
        );
        const data = await response.json();
        dispatch.setAuthState(data);
        dispatch.setIsSignedIn(true);
        await AsyncStorage.setItem(StorageKey, token);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.caption}>
        Daftar Untuk dapat menggunakan aplikasi
      </Text>
      <View style={styles.containerButton}>
        <Button
          title="Facebook"
          style={styles.facebook}
          activeOpacity={0.8}
          onPress={() => logInWithFacebookAsync()}
        />
        <Button
          title="Google"
          style={styles.google}
          activeOpacity={0.8}
          onPress={async () => {
            const _authState = await signInAsync();
            if (_authState) {
              dispatch.setIsSignedIn(true);
              dispatch.setAuthState(_authState);
            }
          }}
        />
        <Button
          title="Email"
          style={styles.email}
          activeOpacity={0.8}
          textColor="#000"
          onPress={() => navigation.navigate('Email')}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.directLogin}>Sudah Punya Akun ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // paddingVertical: 20
  },
  containerButton: {
    marginHorizontal: 30,
    justifyContent: 'space-around',
  },
  caption: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  facebook: {
    backgroundColor: '#4267B2',
    height: 45,
    borderRadius: 30,
    marginBottom: 15,
    justifyContent: 'center',
  },
  google: {
    backgroundColor: '#EA4335',
    height: 45,
    borderRadius: 30,
    marginBottom: 15,
    justifyContent: 'center',
  },
  email: {
    backgroundColor: '#D3D3D3',
    height: 45,
    borderRadius: 30,
    marginBottom: 15,
    justifyContent: 'center',
  },
  directLogin: {
    fontSize: 15,
    color: 'orange',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
