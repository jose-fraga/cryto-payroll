import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ message, colors }) {
  return (
    <View>
      <Text style={styles.textStyle(colors)}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: (colors) => ({
    color: colors.primary || '#000',
  })
});

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
}
