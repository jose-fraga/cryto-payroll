import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { getThemeColors } from '../styles';

export default function ImageBackground({ children, colors }) {
  const [color, setColors] = useState(getThemeColors() || colors)

  return (
    <View
      style={styles.backgroundColor(color)}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundColor: (color) => ({
    backgroundColor: color.playEventColor,
    flex: 1,
  }),
});