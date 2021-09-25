import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import i18n from '../utils/i18n';
import { width, height } from '../utils/device';
import Logger from '../utils/logger';
import { paymentMethodImage } from '../assets';


const logger = Logger.get('JoinEvent.js');

function JoinEvent({
  isVisible,
  onClose,
  event,
  onJoinEvent,
  colors,
  onPaymentPress,
  onCouponPress,
}) {
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  const renderRegisterBtnText = () => {
    if (confirming) {
      return (
        <ActivityIndicator
          size="small"
        />
      );
    } else if (done) {
      return i18n.t('registeredSuccessfully');
    } else {
      return i18n.t('confirm');
    }
  };

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await onJoinEvent();
      setConfirming(false);
      setDone(true);
    } catch (err) {
      logger.log('Error while registering for the event', err);
    }
  };

  const registerButton = () => (
    <TouchableOpacity
      style={styles.registerButton({ confirming, colors })}
      onPress={handleConfirm}
      disabled={confirming || done}
    >
      <Text style={styles.confirm(colors)}>
        {renderRegisterBtnText()}
      </Text>
    </TouchableOpacity>
  );

  const Join = () => (
    <View style={styles.container(colors)}>
      <View style={styles.eventInfo}>
        <Text style={styles.eventName(colors)}>
          {event?.name}
        </Text>
        <Text style={styles.separator(colors)}>·</Text>
        <Text style={styles.balance(colors)}>
          {i18n.toCurrency(event?.balance, { precision: 0 })}
        </Text>
      </View>
      <View>
        <View style={styles.totalContainer({ colors })}>
          <Text style={styles.total(colors)}>{i18n.t('total')}</Text>
          {/* TODO: Event price must come from the API, sice an event can be free */}
          <Text style={styles.totalCost(colors)}>
            {i18n.t('free')}
          </Text>
        </View>

        <TouchableOpacity onPress={onCouponPress}>
          <View style={styles.couponsRow({ colors })}>
            <View style={styles.couponSubContainer}>
              <MaterialCommunityIcons
                name="tag"
                size={24} color={colors.primary}
              />
              <Text style={styles.coupon(colors)}>
                {/* TODO: i18n */}
                No coupons applied
              </Text>
            </View>
            <Text style={styles.addCoupon(colors)}>
              {i18n.t('edit')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPaymentPress}>
          <View style={styles.payments({ colors })}>
            <View style={styles.paymentCard}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={paymentMethodImage('visa')}
              />
              <Text style={styles.cardNum(colors)}>
                {/* {`‧‧‧‧ ${method.number}`} */}
                {/* TODO: Remove below */}
                {`‧‧‧‧ 3377`}
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={colors.primary}
            />
          </View>
        </TouchableOpacity>
      </View>

      {registerButton()}
      <View style={styles.noticeContainer}>
        <Text style={styles.notice(colors)}>
          {i18n.t('joinNotice')}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={onClose}
      deviceWidth={width}
      deviceHeight={height}>
      <Join />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: colors => ({
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: width,
    height: height * 0.75,
    backgroundColor: colors.background,
    paddingTop: '5%',
    alignItems: 'center',
  }),
  registerButton: ({ confirming, colors }) => ({
    width: width * 0.7,
    backgroundColor: confirming ? '#262626' : colors.primary,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderColor: colors.primary,
    borderWidth: 1,
    height: 70,
    flexDirection: 'row',
  }),
  confirm: colors => ({
    color: colors.background,
    fontWeight: '500',
  }),
  couponSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  coupon: colors => ({
    color: colors.primary,
    marginLeft: 10,
  }),
  addCoupon: colors => ({
    color: colors.highlight,
  }),
  noticeContainer: {
    marginHorizontal: 20,
    width: width * 0.9,
  },
  notice: colors => ({
    fontSize: 12,
    color: colors.primary,
  }),
  eventInfo: {
    width,
    marginVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventName: colors => ({
    fontSize: 24,
    fontWeight: '500',
    color: colors.primary,
  }),
  balance: colors => ({
    fontSize: 18,
    fontWeight: '500',
    color: colors.primary,
  }),
  separator: colors => ({
    fontWeight: '600',
    fontSize: 20,
    marginHorizontal: 10,
    color: colors.primary,
  }),
  totalContainer: ({ colors }) => ({
    width,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.shade9,
    borderBottomColor: colors.shade9,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  couponsRow: ({ colors }) => ({
    width,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderTopColor: colors.shade9,
    borderBottomColor: colors.shade9,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  payments: ({ colors }) => ({
    width,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderTopColor: colors.shade9,
    borderBottomColor: colors.shade9,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  total: colors => ({
    fontWeight: '600',
    fontSize: 15,
    color: colors.primary,
  }),
  totalCost: colors => ({
    fontSize: 14,
    color: colors.primary,
  }),
  image: {
    height: 25,
    width: 40,
    marginRight: '10%',
  },
  cardNum: colors => ({
    color: colors.primary,
  }),
  paymentCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
});

JoinEvent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  event: PropTypes.shape({
    name: PropTypes.string,
    balance: PropTypes.number,
  }).isRequired,
  onJoinEvent: PropTypes.func,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
  onPaymentPress: PropTypes.func.isRequired,
  onCouponPress: PropTypes.func.isRequired,
};

export default JoinEvent;
