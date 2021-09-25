import React from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from '../utils/device';

import i18n from '../utils/i18n';

export default function CreatePopquizButton({ onPress }) {
  const animation = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: .95,
    }).start();
  }

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 5,
      tension: 80,
    }).start();
  }

  const animatedStyle = {
    transform: [{ scale: animation }],
  }

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={[styles.createEvetButton, animatedStyle]} useNativeDriver>
        <View style={styles.circle}>
          <MaterialCommunityIcons
            size={25}
            color="black"
            name="ballot-outline"
          />
        </View>
        <Text style={styles.createTxt}>{i18n.t('createPopquiz')}</Text>
        <Text style={styles.createTxtDetails}>{i18n.t('createEventDetails')}</Text>
        <Text style={styles.start}>{i18n.t('start')}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  createEvetButton: {
    width: width * .9,
    height: height * .25,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    borderWidth: .7,
    borderColor: 'rgba(72, 72, 72, 0.5)',
    marginVertical: 20,
    padding: 20,
    alignSelf: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  createTxt: {
    fontWeight: '600',
    fontSize: 20,
    fontWeight: '500'
  },
  createTxtDetails: {
    textAlign: 'center',
    color: 'rgba(72, 72, 72, 0.5)',
    marginHorizontal: 10,
  },
  start: {
    color: '#12db41',
    fontWeight: '600',
    fontSize: 15,
  },
}); 
