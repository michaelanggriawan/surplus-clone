import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity {...props}>
      <Text style={{ ...styles.text, color: props.textColor || '#fff' }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
