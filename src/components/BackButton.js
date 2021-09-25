import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ canGoBack, onPress, marginLeft, color }) => {
  return canGoBack
    ? (
      <TouchableOpacity
        style={{ ...styles.wrapper, marginLeft }}
        onPress={onPress}
      >
        <View style={styles.container}>
          <Ionicons name="ios-arrow-back" size={styles.iconSize} color={color} />
        </View>
      </TouchableOpacity>
    )
    : <View />
};

const styles = StyleSheet.create({
  iconSize: 30,
  wrapper: {
    marginLeft: 30,
  },
  container: {
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

BackButton.propTypes = {
  canGoBack: PropTypes.bool,
  onPress: PropTypes.func,
  marginLeft: PropTypes.number,
  color: PropTypes.string.isRequired,
};

BackButton.defaultProps = {
  canGoBack: true,
  onPress: Function.prototype,
  marginLeft: 10,
};

export default BackButton;
