
import React, { useState, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import CreatePopquizButton from '../components/CreatePopquizButton';
import CreatePopquiz from './CreatePopquiz/CreatePopquiz';
import i18n from '../utils/i18n';


const events = []; // this should be from props

// function Business({ navigation }) {
//   const [displayCreate, setDisplayCreate] = useState(false);


//   return (
//     <View style={styles.container}>
//       <CreatePopquizButton onPress={() => setDisplayCreate(true)} />
//       <View style={styles.eventsContainer}>
//         <Text style={styles.popquizzes}>{i18n.t('popquizzes')}</Text>
//         <Events />
//       </View>
//       <CreatePopquiz visible={displayCreate} />
//     </View>
//   )
// }

class Business extends Component {
  constructor() {
    super();
    this.state = {
      showCreate: false,
    }
  }

  Event = (event, idx) => (
    <View key={idx} style={styles.event}>
      <Text>{event.title}</Text>
    </View>
  );

  events = () => events.length < 1
    ? <Text style={styles.noEvents}>{i18n.t('noPopquizzesCreated')}</Text>
    : events.map(this.Event);

  render() {
    return (
      <View style={styles.container}>
        <CreatePopquizButton onPress={() => this.setState({ showCreate: true })} />
        <View style={styles.eventsContainer}>
          <Text style={styles.popquizzes}>{i18n.t('popquizzes')}</Text>
          {this.events()}
        </View>
        <CreatePopquiz visible={this.state.showCreate} onClose={() => this.setState({ showCreate: false })} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  eventsContainer: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  popquizzes: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(72, 72, 72, 0.5)',
  },
  noEvents: {
    marginVertical: 20,
  },
});

export default Business; 
