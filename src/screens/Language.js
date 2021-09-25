import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-native-flags';
import RightButton from '../components/RightButton';
import appSettingsActions from '../store/actions/appSettingsActions';
import supportedLanguages from '../utils/i18n/languages';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';

const logger = Logger.get('Play.js');

import { getLanguageFlag, getLanguageName } from '../utils/i18n';

const Language = ({ navigation }) => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.appSettings);
  const colors = useSelector((state) => state.appSettings.colors);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const changeLanguage = async (language) => {
    // set language on local storage and store it on the backend
    try {
      await dispatch(appSettingsActions.changeLanguage(language));
      navigation.dispatch(StackActions.popToTop);
    } catch (err) {
      logger.log('Unable to change language', err);
    }
  };

  navigation.setOptions({
    headerRight: () =>
      selectedLanguage && (
        <RightButton
          title={i18n.t('setLanguage')}
          onPress={() => changeLanguage(selectedLanguage)}
        />
      ),
  });

  const LanguageRow = (language) => {
    const isSelected = selectedLanguage === language.code;

    return (
      <TouchableOpacity
        key={language.code}
        style={styles.languageRow}
        onPress={() => setSelectedLanguage(language.code)}>
        <Flag code={language.flag} size={32} />
        <Text style={styles.language({ isSelected, colors })}>
          {language.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container(colors)}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title(colors)}>
            {i18n.t('language')}
          </Text>
          <View style={styles.defaultLanguage}>
            <Flag code={getLanguageFlag(app.language)} size={16} />
            <Text style={{ ...styles.language({ colors }), marginLeft: 5 }}>
              {getLanguageName(app.language)}
            </Text>
          </View>
        </View>
        <ScrollView>{supportedLanguages.map(LanguageRow)}</ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
  }),
  content: {
    padding: '10%',
    height: '100%',
    paddingBottom: 0,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 35,
  },
  title: colors => ({
    fontSize: 40,
    fontWeight: '600',
    color: colors.primary,
  }),
  defaultLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  language: ({ colors, isSelected }) => ({
    marginLeft: 10,
    fontWeight: isSelected ? 'bold' : 'normal',
    color: colors.primary,
  }),
});

Language.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

Language.defaultProps = {};

export default Language;
