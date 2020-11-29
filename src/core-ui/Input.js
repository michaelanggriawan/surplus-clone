import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Input(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        <TextInput {...props} style={styles.input} />
        {props.icon && (
          <TouchableOpacity
            onPress={props.onShowPassword}
            style={{ position: 'absolute', right: 0 }}
          >
            <FontAwesomeIcon icon={props.icon} size={25}/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderBottomWidth: 0.5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
