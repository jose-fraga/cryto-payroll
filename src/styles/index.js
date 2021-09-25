import * as lightTheme from './themes/light';
import * as darkTheme from './themes/dark';

export const colors = {
  modalColor: '#0000009c',
  errorColor: '#fd6f6f',
  inverseTextColor: '#fff',
  textColor: '#000',
  primaryColor: '#fff',
};

export const fontSize = {
  small: 12,
  smallMedium: 16,
  medium: 18,
  large: 24,
};

export default {
  colors,
  fontSize,
};

export {
  lightTheme,
  darkTheme,
};

export const getTheme = (theme = 'light') => {
  switch (theme) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    default:
      return 'light';
  }
};

export const getThemeColors = (theme) => getTheme(theme).colors;