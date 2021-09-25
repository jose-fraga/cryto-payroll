import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../store/actions/userActions';
import { getPayoutImage } from '../components/PayoutMethods';
import RightButton from '../components/RightButton';
import i18n from '../utils/i18n';
import { SCREENS } from '../utils/constants';
import Logger from '../utils/logger';

const logger = Logger.get('PayoutMethods');

const PayoutMethods = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const colors = useSelector((state) => state.appSettings.colors);
  const payout = useSelector((state) => state.user.payout);
  // const [payout, setPayout] = useState(null);

  navigation.setOptions({
    headerRight: () => (
      <RightButton
        title={!payout ? i18n.t('addPayout') : i18n.t('edit')}
        onPress={() => navigation.navigate(SCREENS.EDITPAYOUT)}
      />
    ),
  });

  const getUserPayout = async () => {
    try {
      await dispatch(userActions.getUserPayoutMethod());
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    if (!payout) {
      // @todo remove when the api is fixed. We should always fetch user payout info
      getUserPayout();
    }

    // setPayout(user.payout);
  }, []);

  const renderPayout = () => (
    <View style={styles.payout}>
      <Image
        source={getPayoutImage(payout.payoutMethod)}
        style={styles.payoutImage}
      />
      <Text style={styles.payoutUsername(colors)}>
        {payout.payoutUsername}
      </Text>
    </View>
  );

  return (
    <View style={styles.container(colors)}>
      <Text style={styles.title(colors)}>
        {i18n.t('payoutMethods')}
      </Text>
      <View style={styles.row}>
        {
          payout
            ? <PayoutComponent />
            : <Text style={styles.noPayoutsYet(colors)}>{i18n.t('noPayoutYet')}</Text>
        }
      </View>
      <Text style={styles.disclaimer}>{i18n.t('payoutDisclaimer')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
  }),
  title: colors => ({
    margin: '10%',
    fontSize: 40,
    fontWeight: '600',
    color: colors.primary,
  }),
  row: {
    borderBottomColor: 'rgba(200, 200, 200, 0.7)',
    borderTopColor: 'rgba(200, 200, 200, 0.7)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  disclaimer: {
    marginHorizontal: '10%',
    marginVertical: '5%',
    color: 'rgba(150, 150, 150, 1)',
  },
  payout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payoutImage: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  payoutUsername: colors => ({
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '500',
    color: colors.primary,
  }),
  noPayoutsYet: colors => ({
    color: colors.primary,
  })
});

PayoutMethods.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

PayoutMethods.defaultProps = {};

export default PayoutMethods;
