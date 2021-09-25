import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Contractor() {
  return (
    <View style={styles.container}>
      <Text>Here is the content for contractors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
  },
});

export default Contractor;
