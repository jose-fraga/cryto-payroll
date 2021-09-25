import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

function Prices({ navigation }) {
  const colors = useSelector((state) => state.appSettings.colors);

  return (
    <View style={styles.container(colors)}>
      <Text>Graph Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: colors => ({
    // marginTop: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  })
});

Prices.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default Prices;
