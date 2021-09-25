import React from 'react';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../store/actions/authActions'
import Button from '../components/Button';
import PasswordReq from '../components/PasswordReq';
import { usernameRegEx, passwordRegEx } from '../utils/validation';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';
import appSettingsActions from '../store/actions/appSettingsActions';

const logger = Logger.get("Signup.js");

const Signup = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.appSettings.colors);
  const textColor = (error) => (error ? colors.error : colors.primary);

  const signupSchema = yup.object().shape({
    username: yup.string().matches(usernameRegEx).required('Field is required'),
    password: yup.string().matches(passwordRegEx).required('Field is required'),
    name: yup.string().max(50).required('Field is required'),
  });

  const submit = async (value) => {
    try {
      const response = await dispatch(authActions.signup(value));
      logger.info(response)
    } catch (err) {
      logger.error(err);
    }
    dispatch(appSettingsActions.hideLoginPage());
  }

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } = useFormik({
    initialValues: {
      name: '',
      password: '',
      username: '',
    },
    onSubmit: submit,
    validationSchema: signupSchema,
  });

  const renderInputFields = () => {
    const nameErrors = touched.name && errors.name;
    const usernameErrors = touched.username && errors.username;
    const passwordErrors = touched.password && errors.password;

    return (
      <View style={styles.form}>
        <TextInput
          value={values.name}
          onBlur={handleBlur('name')}
          style={styles.input(textColor(nameErrors))}
          placeholder={i18n.t('name')}
          autoCapitalize="none"
          placeholderTextColor={textColor(nameErrors)}
          onChangeText={handleChange('name')}
        />
        <TextInput
          value={values.username}
          onBlur={handleBlur('username')}
          style={styles.input(textColor(usernameErrors))}
          placeholder={i18n.t('username')}
          autoCapitalize="none"
          placeholderTextColor={textColor(usernameErrors)}
          onChangeText={handleChange('username')}
        />
        <TextInput
          secureTextEntry
          onBlur={handleBlur('password')}
          value={values.password}
          style={styles.input(textColor(passwordErrors))}
          placeholder={i18n.t('password')}
          placeholderTextColor={textColor(passwordErrors)}
          onChangeText={handleChange('password')}
        />
        <View style={styles.passwordReq}>
          <PasswordReq password={values.password} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container(colors)}>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title(colors)}>
                {i18n.t('signup')}
              </Text>
            </View>
            <Text style={styles.subTitle(colors)}>
              {i18n.t('motto')}
            </Text>
            {renderInputFields()}
            <Button
              type="submit"
              title={i18n.t('signup')}
              onPress={handleSubmit}
              colors={colors}
            />
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
  }),
  formContainer: {
    padding: '10%',
    height: '100%',
  },
  passwordReq: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: '5%',
    marginTop: '-5%',
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
  subTitle: colors => ({
    marginTop: 5,
    color: colors.primary,
  }),
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: '5%',
    marginBottom: '3%',
  },
  input: error => ({
    width: '100%',
    borderWidth: 1,
    borderColor: error,
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    marginVertical: '3%',
    color: error,
    fontWeight: '600',
  }),
  logo: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 5,
  },
});

export default Signup;
