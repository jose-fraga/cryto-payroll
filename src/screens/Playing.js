import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Text,
} from 'react-native';
import { setStatusBarStyle } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/stack';
import Question from '../components/Question';
import ColorBackground from '../components/ColorBackground';
import { width, height } from '../utils/device';
import background2 from '../assets/events/background-2.png';

const question = {
  id: '01',
  title: `What sort of animal is Walt Disney's Dumbo?`,
  possibleAnswers: [
    {
      answerId: '1',
      title: `Deer`,
    },
    {
      answerId: '2',
      title: `Rabbit`,
    },
    {
      answerId: '3',
      title: `Elephant`,
    },
    {
      answerId: '4',
      title: `Donkey`,
    },
  ],
};

function Playing({ navigation, route }) {
  const selectedEvent = useSelector((state) => state.events.liveEvents[route.params?.eventId]);
  const colors = useSelector((state) => state.appSettings.colors);
  navigation.setOptions({ 
    headerStyle: { 
      backgroundColor: colors.playEventColor, 
      shadowOffset: {
        height: 0,
      } 
    } 
  });
  
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const headerHeight = useHeaderHeight();

  const onModalShow = () => {
    setStatusBarStyle('light');
    return () => clearTimeout(timer);
  }

  const onModalClose = () => {
    setStatusBarStyle('dark');
  }

  return (
    <ColorBackground color={colors.playEventColor} >
      <View style={styles.container}>
        <Question
          title={question.title}
          possibleAnswers={question.possibleAnswers}
        />
        </View>
    </ColorBackground>
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
});

Playing.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string,
    }),
  }).isRequired,
}

export default Playing;
