import React from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { width } from '../utils/device';

const ButtonCard = ({ title, onPress, icon, colors }) => (
  <TouchableOpacity
    style={styles.button(colors)}
    onPress={onPress}
  >
    <MaterialCommunityIcons
      size={24}
      name={icon}
      color={colors.primary}
      style={styles.icon}
    />
    <Text style={styles.buttonText(colors)}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: colors => ({
    borderColor: colors.primary,
    borderWidth: 1,
    width: width * .3,
    height: width * .3,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  buttonText: colors => ({
    color: colors.primary,
  }),
  icon: {
    margin: 10,
  }
});

ButtonCard.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default ButtonCard;