import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../../store/actions/userActions';
import authActions from '../../store/actions/authActions';
import { setLanguage } from '../../utils/i18n';
import Logger from '../../utils/logger';

const logger = Logger.get('AppSetupBackgroundProcess.js');

export default function AppSetupBackgroundProcess() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.appSettings.language);
  setLanguage(language);

  useEffect(() => {
    dispatch(userActions.getUserDetails())
      .then((userDetail) => {
        logger.trace(userDetail);
        dispatch(authActions.setUserAsAuthenticated());
      })
      .catch((err) => {
        dispatch(authActions.setUserAsUnauthenticated());
        logger.info(err);
      });
  }, []);

  return (
    <View />
  )
}
