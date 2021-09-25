import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/Button';
import { width, height } from '../utils/device';
import { colors, fontSize } from '../styles';
import i18n from '../utils/i18n';

export default function ErrorComponent({
  message,
  modalVisible,
  children,
  title,
  onPress,
  colors,
}) {
  const renderMessage = () =>
    message ? (
      <View style={styles.footer}>
        <Text>{message}</Text>
        <View style={styles.footerButton}>
          <Button
            title={i18n.t('retry')}
            style={styles.button}
            onPress={onPress}
            colors={colors}
          />
        </View>
      </View>
    ) : (
      <View style={styles.footer}>{children}</View>
    );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialIcons name="error-outline" size={100} color="white" />
            <Text style={styles.title}>{title}</Text>
          </View>
          {renderMessage()}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    paddingHorizontal: 40,
    borderRadius: 40,
    backgroundColor: colors.errorColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    backgroundColor: colors.errorColor,
    height: '50%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: fontSize.medium,
    fontWeight: '600',
    color: colors.inverseTextColor,
  },
  footer: {
    height: '50%',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.modalColor,
    padding: 35,
  },
  container: {
    height: height * 0.4,
    width: width * 0.7,
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
  },
});

ErrorComponent.propTypes = {
  message: PropTypes.string,
  modalVisible: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node]),
};

ErrorComponent.defaultProps = {
  message: '',
  modalVisible: false,
  title: '',
  onPress: Function.prototype,
  children: null,
};
