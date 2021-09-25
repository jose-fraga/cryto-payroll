import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { height, width } from '../utils/device';

import SkeletonContent from 'react-native-skeleton-content';

const EventLoadingCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <SkeletonContent
          containerStyle={styles.skeletonTop}
          animationDirection="horizontalLeft"
          layout={[styles.skeletonEventImage]}
          isLoading={true}
        />
        <View style={styles.cardBottom}>
          <SkeletonContent
            containerStyle={styles.skeletonBottom}
            animationDirection="horizontalLeft"
            layout={[styles.skeletonBottomTitle, styles.skeletonBottomSubtitle]}
            isLoading={true}
          />
        </View>
      </View>
    </View>
  );
};

export default EventLoadingCard;

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.3;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
    overflow: 'hidden'
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: '2%'
  },
  cardBottom: {
    height: 70,
    marginLeft: 20
  },
  skeletonTop: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  skeletonEventImage: {
    width: '90%', height: '90%'
  },
  skeletonBottom: {
    flex: 1, width: '100%',
    justifyContent: 'center'
  },
  skeletonBottomTitle: {
    width: 220,
    height: 20,
    marginBottom: 6
  },
  skeletonBottomSubtitle: {
    width: 180,
    height: 20,
    marginBottom: 6
  }
});
