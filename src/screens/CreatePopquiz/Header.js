import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

import i18n from '../../utils/i18n';

const Header = ({ saveDisabled, onClose, onSave }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose}>
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>
      <TouchableWithoutFeedback onSave={onSave}>
        <Text style={styles.save(saveDisabled)}>{i18n.t('save')}</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  save: disabled => ({
    color: disabled ? 'rgba(155,155,155,1)' : '#000',
  }),
});

Header.propTypes = {
  saveDisabled: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
}

Header.defaultProps = {
  saveDisabled: true,
  onClose: Function.prototype,
  onSave: Function.prototype,
}

export default Header;

