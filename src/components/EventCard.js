import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { MaterialIcons } from '@expo/vector-icons';
import format from 'date-fns/format';
import { differenceInHours, differenceInSeconds } from 'date-fns'
import shortNumers from 'short-numbers';
import { width, height } from '../utils/device';
import i18n from '../utils/i18n';
import { dateToCurrentTimeZone } from '../utils/date';
import { fontSize } from '../styles';
import { background4 } from '../assets';

const EventCard = ({ onPress, event, colors }) => {
  const {
    name,
    image,
    balance,
    // endingTime,
    startingTime,
    numberOfUsersInEvent,
  } = event;

  const eventStart = new Date(dateToCurrentTimeZone(startingTime));
  const renderCountDown = () => {
    if ((differenceInHours(eventStart, new Date()) > 24) || (differenceInHours(eventStart, new Date()) < -1)) {
      return (
        <Text style={styles.eventDate(colors)}>
          {format(eventStart, 'MMM d﹒p')}
        </Text>
      );
    }

    return (
      <CountDown
        until={differenceInSeconds(eventStart, new Date())}
        size={30}
        // onFinish={() => alert('Finished')}
        digitStyle={styles.digitStyle}
        digitTxtStyle={styles.digitTxtStyle(colors)}
        separatorStyle={styles.separatorStyle(colors)}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{ h: '', m: '', s: '' }}
        showSeparator
      />
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container(colors)}>
        <View style={styles.card(colors)}>
          <ImageBackground
            resizeMode="cover"
            blurRadius={20}
            source={image || background4}
            style={styles.cardImage}
          >
            <Text style={styles.title(colors)}>{name}</Text>
            <View style={styles.price}>
              <Text style={styles.winnerPrice(colors)}>
                {i18n.toCurrency(balance, { precision: 0 })}
              </Text>
              <Text style={styles.winnerPrice(colors)}>
                {i18n.t('prize')}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.cardBottom}>
            <View style={styles.usersContainer}>
              <MaterialIcons
                name="people"
                size={25}
                color={colors.shade2}
              />
              <Text style={styles.userAmount(colors)}>
                {shortNumers(numberOfUsersInEvent || 0)}
              </Text>
            </View>
            {renderCountDown()}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.3;

const styles = StyleSheet.create({
  container: colors => ({
    justifyContent: 'center',
    alignItems: 'center',
    width,
    borderColor: colors.background,
    elevation: 6,
    overflow: 'hidden',
  }),
  price: {
    display: 'flex',
    flexDirection: 'row',
  },
  separatorStyle: colors => ({
    fontSize: fontSize.smallMedium,
    color: colors.shade2,
  }),
  digitTxtStyle: colors => ({
    color: colors.shade2,
    fontSize: fontSize.smallMedium
  }),
  digitStyle: {
    width: 40,
  },
  card: colors => ({
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    backgroundColor: colors.contrast,
    margin: '2%',
  }),
  cardImage: {
    width: '100%',
    height: CARD_HEIGHT * 0.8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: colors => ({
    fontSize: 40,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
  }),
  winnerPrice: colors => ({
    marginRight: 5,
    fontSize: fontSize.large,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  }),
  cardBottom: {
    flex: 1,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAmount: colors => ({
    marginLeft: 5,
    color: colors.shade2,
    fontSize: fontSize.smallMedium,
  }),
  eventDate: colors => ({
    color: colors.shade2,
    fontSize: fontSize.smallMedium,
  }),
});

EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    balance: PropTypes.number,
    startingTime: PropTypes.string,
    numberOfUsersInEvent: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EventCard;
