import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '../core-ui/Button';
import Input from '../core-ui/Input';


export default function EmailLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={styles.container}>
      <Input
        label="Email"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <Input
        label="kata sandi"
        secureTextEntry={showPassword}
        icon={showPassword ? faEyeSlash : faEye}
        onShowPassword={() => setShowPassword(!showPassword)}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <View style={styles.buttonContainer}>
        <Button title="Daftar" activeOpacity={0.8} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
