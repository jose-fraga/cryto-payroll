import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import userActions from '../store/actions/userActions';
import BackButton from '../components/BackButton';
import i18n from '../utils/i18n';
import { SCREENS } from '../utils/constants';
import Logger from '../utils/logger';

const logger = Logger.get("Account.js");
const fields = ['name', 'username', 'phone', 'email'];

function Account({ navigation, user }) {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.appSettings.colors);

  navigation.setOptions({
    headerLeft: (props) => (
      <BackButton
        {...props}
        color={colors.primary}
      />
    ),
  });

  const getUserInfo = async () => {
    try {
      await dispatch(userActions.getUserDetails());
    } catch (err) {
      logger.error(err);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const renderAcountDetail = (field, idx) => {
    return (
      <TouchableOpacity
        key={`${field}_${idx}`}
        style={styles.accountDetail(colors)}
        onPress={() => navigation.navigate(SCREENS.EDITACCOUNT, { type: field })}>
        <Text style={styles.detailTitle(colors)}>{i18n.t(field)}</Text>
        <Text style={styles.detailValue(colors)}>{user[field]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container(colors)}>
        {fields.map(renderAcountDetail)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
  }),
  accountDetail: colors => ({
    padding: '5%',
    borderWidth: 1,
    borderColor: colors.background,
    borderBottomColor: colors.shade12,
  }),
  detailTitle: colors => ({
    fontSize: 13,
    color: colors.shade2,
    marginVertical: 5,
  }),
  detailValue: colors => ({
    fontSize: 18,
    color: colors.primary,
  }),
});

Account.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    userTypes: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Account);