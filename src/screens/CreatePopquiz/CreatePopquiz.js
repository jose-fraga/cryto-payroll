import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  Alert, 
  Text, 
  View, 
  StyleSheet, 
  Modal, 
  SafeAreaView, 
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { LinearGradient } from 'expo-linear-gradient';
import { height } from '../../utils/device';

import Header from './Header';
import i18n from '../../utils/i18n';
import Input from './Input';

class CreatePopquiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: true,
      title: 'Enter your title',
      description: 'Enter',
      categories: [],
    }
  }

  onClose = () => {
    Alert.alert(i18n.t('stopCreating'), i18n.t('areYouSure'), [
      {
        text: i18n.t('cancel'),
        style: "cancel",
        onPress: () => { },
      },
      {
        text: i18n.t('leave'),
        onPress: this.props.onClose,
        style: "destructive",
      }
    ],
      { cancelable: false }
    );
  }

  toggleModal = () => {
    this.setState({ showInput: !this.state.showInput });
  }

  render() {
    const { saveDisabled, onSave } = this.props;

    return (
      <Modal visible={this.props.visible}>
        <SafeAreaView>
          <View style={styles.gradient}>
            <Header onSave={onSave} onClose={this.onClose} saveDisabled={saveDisabled} />
            <View style={styles.questionContainer}>
              <Text style={styles.questionTitle}>
                Title
              </Text>
              <TouchableWithoutFeedback
                key={1}
                onPress={this.toggleModal} 
                style={styles.questionSubTitle}
              >
                <Text style={{ marginLeft: 20 }}>
                  Soccesr
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.questionTitle}>
                Description
              </Text>
              <TouchableWithoutFeedback 
                key={2}
                onPress={this.toggleModal} 
                style={styles.questionSubTitle}
              >
                <Text style={{ marginLeft: 20 }}>
                  Soccer
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </SafeAreaView>
        <Input
          isVisible={this.state.showInput}
          onBackdropPress={this.toggleModal}
        />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  questionSubTitle: { 
    backgroundColor: '#f7f7f7', 
    marginVertical: 20, 
    height: 45, 
    borderRadius: 10, 
    justifyContent: 'center' 
  },
  container: {
    flex: 1,
  },
  gradient: {
    height,
  },
  questionContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  questionTitle: {
    fontSize: 18,
  },
});

CreatePopquiz.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
}

CreatePopquiz.defaultProps = {
  visible: false,
  onClose: Function.prototype,
  onSave: Function.prototype,
}

export default CreatePopquiz; 
