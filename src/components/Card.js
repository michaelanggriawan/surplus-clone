import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.url }} style={styles.img} />
      <Text style={styles.text}>{props.name}</Text>
      <Text style={styles.text}>{props.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
  },
  img: {
    height: 200
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
