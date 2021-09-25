import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import ColorBackground from '../components/ColorBackground';
import { differenceInSeconds, setMilliseconds } from 'date-fns';
import { SCREENS } from '../utils/constants';
import { fontSize } from '../styles';

function StartPlaying({ navigation, route }) {
  const colors = useSelector((state) => state.appSettings.colors);
  const selectedEvent = useSelector((state) => state.events.liveEvents[route.params?.eventId]);

  navigation.setOptions({ 
    headerStyle: { 
      backgroundColor: colors.preEventScreenColor, 
      shadowOffset: {
        height: 0,
      } 
    } 
  });

  const onFinish = () => {
    navigation.navigate({
      name: SCREENS.EVENT_START,
      params: {
        eventId: selectedEvent?.id,
      }
    });
  }

  // TODO: uncomment
  if (!selectedEvent?.id) {
    onFinish();
    // navigation.navigate(SCREENS.APP)
  }

  const milisec = selectedEvent?.miliSecondsUntilGameStart || 50000;
  const timeAhead = setMilliseconds(new Date(), milisec);

  return (
    <ColorBackground color={colors.preEventScreenColor}>
      <View style={styles.container}>
        <View>
          <CountDown
            until={differenceInSeconds(timeAhead, new Date())}
            size={30}
            onFinish={onFinish}
            digitStyle={styles.digitStyle}
            digitTxtStyle={styles.digitTxtStyle(colors)}
            separatorStyle={styles.separatorStyle(colors)}
            timeToShow={[ 'M', 'S']}
            timeLabels={{ m: '', s: '' }}
            showSeparator
          />
        </View>
      </View>
    </ColorBackground>
  );
}

const styles = StyleSheet.create({
  separatorStyle: colors => ({
    fontSize: fontSize.smallMedium,
    color: colors.shade2,
  }),
  digitTxtStyle: colors => ({
    color: colors.shade2,
    fontSize: fontSize.smallMedium
  }),
  digitStyle: {
    width: 100,
  },
  container: {
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

StartPlaying.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string,
    }),
  }).isRequired,
}

export default StartPlaying;
