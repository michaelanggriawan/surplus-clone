import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Input from '../core-ui/Input';
import Button from '../core-ui/Button';

export default function Email() {
  const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        label="Nama"
        onChangeText={(value) => setName(value)}
        value={name}
      />
      <Input
        label="Nomor hp"
        onChangeText={(value) => setNumber(value)}
        value={number}
        keyboardType = 'number-pad'
      />
      <Input
        label="Email"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <Input
        label="Buat kata sandi"
        secureTextEntry={showPassword}
        icon={showPassword ? faEyeSlash : faEye}
        onShowPassword={() => setShowPassword(!showPassword)}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />

      <View style={styles.buttonContainer}>
        <Button title="Daftar" activeOpacity={0.8} style={styles.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#01796f',
    borderRadius: 20,
    height: 40,
  },
  buttonContainer: {
    marginTop: '20%',
  },
});
