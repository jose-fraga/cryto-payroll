import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { calculateTimeLeft } from '../utils/date';

export default function CountDown({ date }) {
  const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft(date));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(`${timeLeft[interval]} ${interval}`);
  });

  const counter = timerComponents.join(' ');

  return (
    <View>
      <Text>{timerComponents.length ? counter : `Time's up!`}</Text>
    </View>
  );
}

CountDown.propTypes = {
  date: PropTypes.string,
};

CountDown.defaultProps = {
  date: '2021-01-01',
};
