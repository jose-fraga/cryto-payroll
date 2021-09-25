import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { height, width } from '../../utils/device';

const Input = ({ isVisible, onBackdropPress }) => {
  return (
    <Modal
      deviceWidth={width}
      deviceHeight={height}
      isVisible={isVisible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      onBackdropPress={onBackdropPress}
      supportedOrientations={['portrait']}
      style={{ justifyContent: 'flex-start' }}>
      <View style={{ backgroundColor: '#fff', marginTop: 120, borderRadius: 10 }}>
        {/* <TextInput
          autoCapitalize="none"
          placeholderTextColor="rgb(150, 150, 150)"
          autoFocus placeholder="Enter title"
          style={{ height: 45, paddingLeft: 10, borderRadius: 10 }} /> */}
      </View>
    </Modal>
  )
}

export default Input

const styles = StyleSheet.create({})
