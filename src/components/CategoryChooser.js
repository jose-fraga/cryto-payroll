//TODO: reefactor
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import i18n from '../utils/i18n';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/stack';
import { width, height } from '../utils/device';

function Playing({ onClose, ...props }) {
  const headerHeight = useHeaderHeight();

  const Header = () => (
    <View style={[styles.header, { height: headerHeight }]}>
      <TouchableOpacity onPress={onClose} style={styles.headerIcon}>
        <MaterialCommunityIcons
          size={30}
          name="close"
          color={styles.headerIcon.color}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      {...props}
      style={styles.modal}
      hasBackdrop={false}
      deviceWidth={width}
      deviceHeight={height}>
      <View style={styles.container}>
        <Header />
        <View>
          <Text>fsd</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  container: {
    width,
    height,
    alignItems: 'center',
  },
  header: {
    width,
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  headerIcon: {
    color: '#fff',
    marginLeft: 20,
  }
});

export default Playing;