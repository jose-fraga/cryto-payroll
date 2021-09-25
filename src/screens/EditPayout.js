import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import PayoutMethods, { getPayoutImage } from '../components/PayoutMethods';
import Input from '../components/Input';
import appSettingsActions from '../store/actions/appSettingsActions';
import userActions from '../store/actions/userActions';
import i18n from '../utils/i18n';
import { SCREENS } from '../utils/constants';
import Logger from '../utils/logger';

const logger = Logger.get('EditPayout.js');
const textColor = (error) => (error ? 'fd6f6f' : '#000');

const EditPayout = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [payoutMethod, setPayoutMethod] = useState(null);
  const [payoutUsername, setPayoutUsername] = useState(null);

  const selectStep = step === 1;

  const dispatch = useDispatch();
  const payoutMethods = useSelector(
    (state) => state.appSettings.payoutMethods || [],
  );
  const colors = useSelector((state) => state.appSettings.colors);

  const getPayoutMethods = async () => {
    try {
      await dispatch(appSettingsActions.getPayoutMethods());
    } catch (err) {
      logger.error(err);
    }
  };

  const updateUserPayout = async () => {
    try {
      await dispatch(
        userActions.updateUserPayout({ payoutUsername, payoutMethod }),
      );
    } catch (err) {
      logger.error(err);
    }
    navigation.navigate(SCREENS.PAYOUTMETHODS);
  };

  useEffect(() => {
    getPayoutMethods();
  }, []);

  const TitleContainer = () => (
    <>
      <View style={styles.titleContainer}>
        {selectStep ? (
          <Image source={getPayoutImage(payoutMethod)} style={styles.logo} />
        ) : (
            <View />
          )}
        <Text style={styles.title(colors)}>
          {selectStep ? payoutMethod : i18n.t('select')}
        </Text>
      </View>
      {selectStep ? (
        <Text style={styles.subtitle(colors)}>
          {i18n.t('enterPayoutUsername', { appName: payoutMethod })}
        </Text>
      ) : (
          <View />
        )}
    </>
  );

  const Steps = () => {
    switch (step) {
      case 0: {
        return (
          <View style={styles.form}>
            <PayoutMethods
              colors={colors}
              selected={payoutMethod}
              onSelect={(method) => setPayoutMethod(method)}
              availableMethods={payoutMethods.map((method) => method.name)}
            />
          </View>
        );
      }
      case 1: {
        return (
          <View style={styles.form}>
            <Input
              colors={colors}
              value={payoutUsername}
              onChangeText={setPayoutUsername}
            />
          </View>
        );
      }
      default:
        return <View />;
    }
  };

  const getButtonContent = () => {
    switch (step) {
      case 0:
        return {
          title: i18n.t('continue'),
          action: () => setStep(1),
        };
      case 1:
        return {
          title: i18n.t('save'),
          action: () => updateUserPayout(),
        };
      default:
        return {};
    }
  };

  // TODO: refactor
  return (
    <View style={styles.container(colors)}>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <TitleContainer />
            {Steps()}
            {payoutMethod ? (
              <Button
                colors={colors}
                title={getButtonContent().title}
                onPress={getButtonContent().action}
              />
            ) : (
                <View />
              )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
    // backgroundColor: 'white',
  }),
  formContainer: {
    padding: '10%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: colors => ({
    fontSize: 40,
    fontWeight: '600',
    color: colors.primary,
  }),
  subtitle: colors => ({
    marginTop: 10,
    color: colors.primary,
  }),
  form: {
    marginTop: 20,
    marginBottom: 10,
  },
  input: (error) => ({
    borderWidth: 1,
    borderColor: textColor(error),
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    marginVertical: '3%',
    color: textColor(error),
    fontWeight: '600',
  }),
  logo: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
});

EditPayout.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

EditPayout.defaultProps = {
};

export default EditPayout;
