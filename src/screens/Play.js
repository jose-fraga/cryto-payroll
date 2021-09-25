import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { differenceInSeconds } from 'date-fns';
import userActions from '../store/actions/userActions';
import EventCard from '../components/EventCard';
import ErrorComponent from '../components/Error';
import EventLoadingCard from '../components/EventLoadingCard';
import EventCardSeparator from '../components/EventCardSeparator';
import EmptyState from '../components/EmptyState';
import { width } from '../utils/device';
import i18n from '../utils/i18n';
import { SCREENS, ERRORS } from '../utils/constants';
import Logger from '../utils/logger';
import { fontSize } from '../styles';
import { dateToCurrentTimeZone } from '../utils/date';

const logger = Logger.get('Play.js');

function Play({ navigation }) {
  navigation.setOptions({
    title: i18n.t('myEvents'),
  });

  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const colors = useSelector((state) => state.appSettings.colors);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const events = useSelector((state) => {
    return Object.values(state.events.eventsMap)
      .filter(e => e.isUserRegister)
      .sort((curr, next) => {
        const currStart = new Date(dateToCurrentTimeZone(curr.startingTime));
        const nextStart = new Date(dateToCurrentTimeZone(next.startingTime));

        return differenceInSeconds(currStart, nextStart)
      })
  });

  useEffect(() => {
    if (session.isUserLoggedIn) {
      getUserEvents();
    }
  }, [session.isUserLoggedIn]);

  const getUserEvents = async () => {
    try {
      setRefreshing(true);
      setError(false)
      await dispatch(userActions.getUserEvents());

    } catch (err) {
      setError(true)
      logger.error('err events.js getUserEvents()', err);
    }
    setRefreshing(false);
  }

  const onPlayEvent = (item) => {
    navigation.navigate(SCREENS.PLAY_EVENT_DETAILS, { event: item })
  }

  const myEvents = () => (
    <FlatList
      data={events}
      contentContainerStyle={styles.eventsContainer}
      ItemSeparatorComponent={() => <EventCardSeparator />}
      ListEmptyComponent={() => <EmptyState colors={colors} message={i18n.t('noData')}/>}
      renderItem={({ item }) => {
        if (item.endingTime) {
          return <View/>
        }

        return (
          <EventCard
            colors={colors}
            event={item}
            numberOfUsersInEvent={Math.floor(Math.random() * 20000) + 100}
            onPress={() => onPlayEvent(item)}
          />
        );
      }}
      refreshing={refreshing}
      onRefresh={getUserEvents}
      keyExtractor={(item, idx) => idx.toString()}
    />
  );

  const Loading = () => (
    <FlatList
      data={[1, 2, 3]}
      renderItem={() => <EventLoadingCard />}
      keyExtractor={(item, idx) => idx.toString()}
    />
  );

  const LoggedOut = () => (
    <View style={styles.noAuth}>
      <Text style={styles.noAuthTitle}>
        {i18n.t('notRegisterInAnyEvents')}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.EVENTS)}>
        <View style={styles.goToLogin}>
          <Text style={styles.toLoginText}>
            {i18n.t('viewEvents')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderLoading = () => {
    if (session.isUserLoggedIn && refreshing) {
      return <Loading />;
    } else if (session.isUserLoggedIn) {
      return myEvents();
    }

    return <LoggedOut />;
  };

  return (
    <View style={styles.container}>
      {renderLoading()}
      <ErrorComponent
        title={i18n.t(ERRORS['unexpected_error'].title)}
        message={i18n.t(ERRORS['unexpected_error'].message)}
        modalVisible={error}
        onPress={getUserEvents}
        colors={colors}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noAuth: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 40,
  },
  noAuthTitle: {
    fontSize: fontSize.large
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
  },
  eventsContainer: {
    width,
    padding: '3%',
    alignItems: 'center',
  },
  playContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  goToLogin: {
    margin: 20,
    width: width * 0.7,
    backgroundColor: '#000',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toLoginText: {
    color: '#fff',
  },
});

Play.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func,
  }).isRequired,
};

export default Play;
