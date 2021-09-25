import React from 'react';
import { StyleSheet, View } from 'react-native';

const EventCardSeparator = () => {
  return (
    <View style={styles.cardSeparator} />
  )
}

export default EventCardSeparator;

const styles = StyleSheet.create({
  cardSeparator: {
    height: 10,
  },
})
