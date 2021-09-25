import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import EventLoadingCard from '../components/EventLoadingCard';
import { width } from '../utils/device';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';
import { fontSize } from '../styles';
import SearchBar from '../components/SearchBar';

const logger = Logger.get('Contractors.js');

function Contractor({ navigation }) {
  navigation.setOptions({
    title: i18n.t('contractors'),
  });

  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const colors = useSelector((state) => state.appSettings.colors);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onSearchBlur = () => {
    searchEvents({ searchString: searchValue });
  };

  const updateSearch = (search) => {
    this.setState({ search });
  };

  useEffect(() => {
    if (session.isUserLoggedIn) {

    }
  }, [session.isUserLoggedIn]);

  const Loading = () => (
    <FlatList
      data={[1, 2, 3]}
      renderItem={() => <EventLoadingCard />}
      keyExtractor={(item, idx) => idx.toString()}
    />
  );

  return (
    <View style={styles.container}>
        <View>
            <SearchBar
                value={searchValue}
                onBlur={onSearchBlur}
                placeholder={i18n.t('searchEvents')}
                onChangeText={setSearchValue}
                colors={colors}
            />
        </View>
        <View style={styles.fixToText}>
            <Button
                title={i18n.t('addContractor')}
                onPress={() => Alert.alert('Left button pressed')}
            />
            <Button
                title={i18n.t('payContractor')}
                onPress={() => Alert.alert('Right button pressed')}
            />
      </View>
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

Contractor.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func,
  }).isRequired,
};

export default Contractor;
