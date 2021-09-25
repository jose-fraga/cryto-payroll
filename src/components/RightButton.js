import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function RightButton({ title, onPress, ...props }) {
  return (
    <TouchableOpacity
      {...props}
      style={styles.container}
      onPress={onPress} >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  text: {
    color: '#12db41',
    fontSize: 17,
  },
});