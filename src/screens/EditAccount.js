import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  InputAccessoryView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import i18n from '../utils/i18n';
import { capitalize } from '../utils/strings';
import { SCREENS } from '../utils/constants';

const EditAccount = ({ route, navigation }) => {
  const type = route.params.type;
  const colors = useSelector((state) => state.appSettings.colors);
  const value = 'Abraham';

  const renderInput = ({ title, value }) => {
    const keyboardType = () => {
      switch (type) {
        case 'phone':
          return 'numeric';
        case 'email':
          return 'email-address';
        default:
          return 'default';
      }
    };

    return (
      <>
        <Text style={styles.typeText(colors)}>{capitalize(type)}</Text>
        <Input
          autoFocus
          colors={colors}
          inputAccessoryViewID="edit-account-accessory-view"
          keyboardType={keyboardType()}
        />
      </>
    );
  };

  const renderEditElement = () => {
    switch (type) {
      case 'name':
        return renderInput({
          title: i18n.t('name'),
          value,
        });
      case 'username':
        return renderInput({
          title: i18n.t('username'),
          value,
        });
      case 'phone':
        return renderInput({
          title: i18n.t('phone'),
          value,
        });
      case 'email':
        return renderInput({
          title: i18n.t('email'),
          value,
        });
    }
  };

  return (
    <View style={styles.container(colors)}>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {renderEditElement()}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <InputAccessoryView nativeID="edit-account-accessory-view">
        <View style={styles.buttonContainer}>
          <Button
            colors={colors}
            title={`Update ${capitalize(type)}`}
            onPress={() => navigation.navigate(SCREENS.PROFILE)}
          />
        </View>
      </InputAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
    padding: '5%',
  }),
  typeText: colors => ({
    fontSize: 20,
    fontWeight: '300',
    marginVertical: 5,
    color: colors.primary,
  }),
  buttonContainer: {
    width: '100%',
    padding: '3%',
  },
});

EditAccount.propTypes = {
  type: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
};

EditAccount.defaultProps = {
  type: 'phone',
};

export default EditAccount;
