import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import appSettingsActions from '../store/actions/appSettingsActions';
import ButtonCard from '../components/ButtonCard';
import { width } from '../utils/device';
import i18n from '../utils/i18n';

const Appearance = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.appSettings.colors);

  const toggleTheme = (theme) => {
    dispatch(appSettingsActions.changeTheme({ theme }));
  }

  return (
    <View style={styles.container}>
      <ButtonCard
        colors={colors}
        icon="moon-waning-crescent"
        title={i18n.t('light')}
        onPress={() => toggleTheme('light')}
      />
      <ButtonCard
        colors={colors}
        icon="white-balance-sunny"
        title={i18n.t('dark')}
        onPress={() => toggleTheme('dark')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
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

export default Appearance;