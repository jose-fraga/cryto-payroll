import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import format from 'date-fns/format';
import { useSelector, useDispatch } from 'react-redux';
import { width, height } from '../utils/device';
import JoinEvent from '../components/JoinEvent';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';
import userActions from '../store/actions/userActions';
import * as images from '../assets';
import appSettingsActions from '../store/actions/appSettingsActions';
import { dateToCurrentTimeZone } from '../utils/date';
import { SCREENS } from '../utils/constants';

const logger = Logger.get('EventDetails.js');

const EventDetails = ({ navigation, route, ...props }) => {
  navigation.setOptions({ headerTransparent: true });

  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const colors = useSelector((state) => state.appSettings.colors);
  const [isJoinVisible, setJoinVisible] = useState(false);
  const event = route.params?.event;

  const details = [
    {
      Icon: MaterialCommunityIcons,
      iconName: 'calendar-month-outline',
      title: format(new Date(dateToCurrentTimeZone(event?.startingTime)), 'E, MMM d, Y'),
      subtitle: `${format(new Date(dateToCurrentTimeZone(event?.startingTime)), 'p')}`,
    },
    {
      Icon: MaterialIcons,
      iconName: 'people-outline',
      title: `${event?.numberOfUsersInEvent || 0} ${i18n.t('playing')}`,
      subtitle: i18n.t('registerNow'),
    },
    {
      Icon: Entypo,
      iconName: 'language',
      title: `Languages`,
      subtitle: event?.languages?.length
        ? event.languages.join(', ')
        : i18n.t('english'),
    },
    {
      Icon: MaterialIcons,
      iconName: 'attach-money',
      title: '$1.40',
      subtitle: i18n.t('dayToWin'),
    },
  ];

  const handleJoin = () => {
    if (session.isUserLoggedIn && event.isUserRegister) {
      navigation.navigate({
        name: SCREENS.START_PLAYING_EVENT,
        params: {
          eventId: event?.id
        }
      })
    } else if (session.isUserLoggedIn) {
      setJoinVisible(true);
    } else {
      dispatch(appSettingsActions.showLoginPage())
    }
  };

  const handleConfirm = async () => {
    const eventId = event?.id;
    if (eventId) { 

      try {
        await dispatch(userActions.registerEvent({ eventId }));
      } catch (err) {
        logger.error('Error while registring event', err);
      }
    }
  };

  const renderSmallDetails = ({ Icon, iconName, title, subtitle }, idx) => (
    <View key={`${idx}_${iconName}`} style={styles.eventSmallDetails}>
      <Icon name={iconName} size={24} color={colors.shade2} />
      <View style={styles.eventSmallDetailsTextContainer}>
        <Text style={styles.eventSmallDetailsTitle(colors)}>
          {title}
        </Text>
        <Text style={styles.eventSmallDetailsSubtitle(colors)}>
          {subtitle}
        </Text>
      </View>
    </View>
  );

  const renderEventCardTop = () => (
    <ImageBackground
      blurRadius={30}
      style={styles.blurredContainer}
      source={event?.image || images.background4}
    >
      <ImageBackground
        style={styles.card}
        imageStyle={styles.cardImage}
        source={event?.image || images.background4}
      >
        <Text style={styles.eventPrize(colors)}>
          {i18n.toCurrency(event?.balance, { precision: 0 })}
        </Text>
        <TouchableOpacity style={styles.joinButton(colors)} onPress={handleJoin}>
          <Text style={styles.joinText(colors)}>{i18n.t('join')}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ImageBackground>
  );

  const renderEventDetails = () => (
    <View style={styles.eventDetails}>
      <Text style={styles.eventCategory(colors)}>
        {event?.name || ''}
      </Text>
      <View style={styles.aboutDescription}>
        {
          event?.description
            ? <Text style={styles.description}>{event?.description}</Text>
            : <View />
        }
      </View>
      <View style={styles.orginizer}>
        <Image source={{ url: 'https://avatars3.githubusercontent.com/u/25258191?s=460' }} style={styles.orginizerImage} />
        <Text style={styles.orginizerName(colors)}>
          {i18n.t('byPopquizTeam', { organization: i18n.t('popquizTeam') })}
        </Text>
      </View>
      {details.map(renderSmallDetails)}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderEventCardTop()}
        {renderEventDetails()}
      </ScrollView>
      <JoinEvent
        event={event}
        isVisible={isJoinVisible}
        onClose={() => setJoinVisible(false)}
        onJoinEvent={handleConfirm}
        colors={colors}
        onPaymentPress={() => {}}
        onCouponPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  blurredContainer: {
    width,
    minHeight: height * 0.3,
    marginBottom: height * 0.1,
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
    alignItems: 'center',
    shadowColor: 'rgba(72, 72, 72, 0.7)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 35,
    shadowOpacity: 1.0,
  },
  card: {
    marginTop: height * 0.1,
    width: width * 0.9,
    height: height * 0.25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    borderRadius: 10,
  },
  eventPrize: colors => ({
    color: colors.primary,
    fontSize: 45,
    fontWeight: '800',
  }),
  joinButton: colors => ({
    backgroundColor: colors.primary,
    borderRadius: 30,
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  joinText: colors => ({
    fontSize: 15,
    color: colors.background,
    marginHorizontal: '10%',
    marginVertical: '3%',
  }),
  eventDetails: {
    marginHorizontal: 20,
  },
  eventCategory: colors => ({
    color: colors.primary,
    fontSize: 35,
    fontWeight: '800',
  }),
  orginizer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 40,
  },
  orginizerImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: 'rgba(72, 72, 72, 0.7)',
    backgroundColor: 'rgba(200, 200, 200, .2)',
    borderWidth: 0.1,
  },
  orginizerName: colors => ({
    fontWeight: '400',
    fontSize: 17,
    marginLeft: 10,
    color: colors.primary,
  }),
  eventSmallDetails: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  eventSmallDetailsTextContainer: {
    marginLeft: 20,
  },
  eventSmallDetailsTitle: colors => ({
    fontSize: 15,
    marginBottom: 5,
    color: colors.primary
  }),
  eventSmallDetailsSubtitle: colors => ({
    fontSize: 12,
    marginVertical: 2,
    color: colors.shade5,
  }),
  description: {
    marginVertical: 15,
  },
});

EventDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      event: PropTypes.shape({}),
    }),
  }).isRequired,
};

export default EventDetails;
