import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import rootContext from '../context/globalAccess';

export default function Profile() {
  const { authState } = useContext(rootContext);
  return (
    <View style={styles.container}>
      <Text style={styles.fonts}>
        Name: {`${authState && authState.name || 'Anonymous'}`}
      </Text>
      <Text style={styles.fonts}>
        ID: {`${authState && authState.id || 'XXXX-XXXX-XXXX'}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fonts: {
    fontSize: 20,
  },
});
