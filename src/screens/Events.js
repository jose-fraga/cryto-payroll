import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { differenceInSeconds } from 'date-fns';
import eventsActions from '../store/actions/eventsActions';
import userActions from '../store/actions/userActions';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import ErrorComponent from '../components/Error';
import EventLoadingCard from '../components/EventLoadingCard';
import EventCardSeparator from '../components/EventCardSeparator';
import { width, height } from '../utils/device';
import { SCREENS, ERRORS } from '../utils/constants';
import Logger from '../utils/logger';
import i18n from '../utils/i18n';
import EmptyState from '../components/EmptyState';
import { dateToCurrentTimeZone } from '../utils/date';

const logger = Logger.get('Events.js');

function Events({ navigation }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  // const [focusedOnSearch, setFocusedOnSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const colors = useSelector((state) => state.appSettings.colors);
  const [error, setError] = useState(false);
  const session = useSelector((state) => state.session);
  const events = useSelector((state) => {
    return Object.values(state.events.eventsMap)
      .filter(e => !e.isUserRegister)
      .sort((curr, next) => {
        const currStart = new Date(dateToCurrentTimeZone(curr.startingTime));
        const nextStart = new Date(dateToCurrentTimeZone(next.startingTime));

        return differenceInSeconds(currStart, nextStart)
      })
  });

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar
        value={searchValue}
        onBlur={onSearchBlur}
        placeholder={i18n.t('searchEvents')}
        onChangeText={setSearchValue}
        colors={colors}
      />
    ),
  });

  const fetchEvents = async () => {
    setRefreshing(true);	
    try {
      await dispatch(eventsActions.getEvents());
      if (session.isUserLoggedIn) {
        await dispatch(userActions .getUserEvents());
      }
      setError(false);
    } catch (err) {
      setError(true);
      logger.trace(err);
    }

    setRefreshing(false);
  };

  const searchEvents = ({ searchString }) => {
    // await doSearch();
    logger.log(`Searching events. Search value: ${searchString}`);
  };

  const onSearchBlur = () => {
    searchEvents({ searchString: searchValue });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [session.isUserLoggedIn]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const Loading = () => (
    <FlatList
      data={[1, 2, 3]}
      renderItem={() => <EventLoadingCard />}
      keyExtractor={(item, idx) => idx.toString()}
    />
  );

  const EventsList = () => (
    <FlatList
      contentContainerStyle={styles.eventsContainer}
      data={events}
      ItemSeparatorComponent={() => <EventCardSeparator />}
      ListEmptyComponent={() => <EmptyState colors={colors} message={i18n.t('noData')} />}
      renderItem={({ item: event }) => event.endingTime
        ? <View />
        : (
          <EventCard
            colors={colors}
            event={event}
            onPress={() => {
              navigation.navigate(SCREENS.EVENTDETAILS, { event });
            }}
          />
        )
      }
      keyExtractor={(item, idx) => idx.toString()}
      refreshing={refreshing}
      onRefresh={handleRefresh}	
    />
  );

  const renderEvents = () => {
    if (refreshing) {
      return <Loading />;
    } else if (error) {
      return (
        <ErrorComponent
          title={i18n.t(ERRORS['unexpected_error'].title)}
          message={i18n.t(ERRORS['unexpected_error'].message)}
          modalVisible={error}
          onPress={handleRefresh}
          colors={colors}
        />
      );
    } else {
      return <EventsList />;
    }
  };

  return (
    <View
      // colors={[
      //   colors.background,
      //   colors.background,
      // ]}
      style={styles.container(colors)}
    >
      {renderEvents()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: colors => ({
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  }),
  eventsContainer: {
    width,
    padding: '3%',
    alignItems: 'center',
  },
  noEvents: {
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Events.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default Events;
