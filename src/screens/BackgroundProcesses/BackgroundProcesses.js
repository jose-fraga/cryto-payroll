import React from 'react'
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import SocketBackgroundProcess from './SocketBackgroundProcess';
import AppSetupBackgroundProcess from './AppSetupBackgroundProcess';

export default function BackgroundProcesses() {
  const appSettings = useSelector((state) => state.appSettings);

  const barStyle = theme => {
    switch (theme) {
      case 'dark':
        return 'light';
      default:
        return 'dark';
    }
  }

  const { theme } = appSettings;

  return (
    <>
      <StatusBar style={barStyle(theme)} />
      <AppSetupBackgroundProcess />
      <SocketBackgroundProcess />
    </>
  )
}
