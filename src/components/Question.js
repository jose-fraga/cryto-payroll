import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import * as Haptics from 'expo-haptics';
import { width, height } from '../utils/device';
import { fontSize, getThemeColors } from '../styles';

function Question({ title, possibleAnswers, onSelect, colors = getThemeColors() }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleOnSelect = (answerId) => {
    if (selectedAnswer) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSelectedAnswer(answerId);
    onSelect(answerId);
  };

  const Answers = (answer, idx) => {
    const isSelected = selectedAnswer === answer.answerId;

    return (
      <TouchableWithoutFeedback
        key={`${answer.answerId}_${idx}`}
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        onPress={() => handleOnSelect(answer.answerId)}
      >
        <View style={styles.answerContainer(isSelected, colors)}>
          <Text style={styles.answer(isSelected, colors)}>
            {answer.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.possibleAnswers}>{possibleAnswers.map(Answers)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: height * 0.7,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-around',
  },
  questionContainer: {
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: fontSize.large,
    textAlign: 'center',
    fontWeight: '500',
  },
  possibleAnswers: {
    height: '35%',
  },
  answerContainer: (selected, colors) => ({
    height: 50,
    borderWidth: 2,
    marginVertical: 3,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: selected ? colors.primary : colors.shade7,
    backgroundColor: selected ? colors.primary : 'transparent',
  }),
  answer: (selected, colors) => ({
    fontWeight: '600',
    marginLeft: 10,
    color: selected ? colors.background : colors.primary,
  }),
});

Question.propTypes = {
  title: PropTypes.string,
  possibleAnswers: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

Question.defaultProps = {
  title: '',
  possibleAnswers: [],
  onSelect: Function.prototype,
};

export default Question;
