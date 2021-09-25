import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Image, ViewPropTypes } from 'react-native';

const Input = ({ style, inputStyle, error, imageSource, colors, ...props }) => {
  const textColor = error => {
    if (error) {
      return colors.error;
    } else {
      return colors.primary;
    }
  };

  return (
    <View style={{ ...styles.container(textColor(error)), ...style }}>
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      )}
      <TextInput
        {...props}
        inlineImagePadding={2}
        autoCapitalize="none"
        style={{ ...styles.input(textColor(error)), ...inputStyle }}
        placeholderTextColor={textColor(error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: color => ({
    height: 50,
    borderWidth: 1,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: color,
  }),
  input: color => ({
    flex: 1,
    height: '100%',
    fontWeight: '600',
    alignItems: 'stretch',
    color: color,
    marginLeft: '3%',
  }),
  image: {
    width: 25,
    marginLeft: '3%',
  },
});

Input.propTypes = {
  style: ViewPropTypes.style,
  inputStyle: ViewPropTypes.style,
  error: PropTypes.bool,
  imageSource: PropTypes.node,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

Input.defaultProps = {
  style: {},
  inputStyle: {},
  error: false,
};

export default Input;
