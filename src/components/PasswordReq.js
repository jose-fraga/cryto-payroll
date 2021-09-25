import React from 'react';
import { StyleSheet } from 'react-native';
import { TextPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { passwordRegEx } from '../utils/validation';


export default function PasswordReq({ password }) {
  return (
    <TextPasswordStrengthDisplay
      password={password}
      minLength={1}
      scoreLimit={50}
      variations={{
        password: passwordRegEx,
      }}
      levels={[
        {
          label: 'Weak',
          labelColor: '#fd6f6f',
        },
        {
          label: 'Strong',
          labelColor: '#006400',
        },
        {
          label: 'Super Strong',
          labelColor: '#006400',
        },
      ]}
    />
  )
}
