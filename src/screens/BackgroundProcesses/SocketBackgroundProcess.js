import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { APP_SOCKET_HOST, APP_SOCKET_PORT } from 'react-native-dotenv';
import { connect } from 'react-redux';
import get from 'lodash/get';
import appSettingsActions from '../../store/actions/appSettingsActions';
import { UNIQUE_ID } from '../../utils/constants';
import Logger from '../../utils/logger';

const logger = Logger.get('SocketBackgroundProcess')

class SocketBackgroundProcess extends Component {
  constructor() {
    super();
    this.socket = null;
    this.events = [
      {
        eventName: 'new.connection',
        cb: item => this.newConnection(item),
      },
      {
        eventName: 'connect',
        cb: item => this.connect(item),
      },
      {
        eventName: 'event.start',
        cb: item => logger.log(item),
      },
      {
        eventName: 'event.question',
        cb: item => logger.log(item),
      },
      {
        eventName: 'event.question.answer',
        cb: item => logger.log(item),
      },
      {
        eventName: 'disconnect',
        cb: item => this.disconnect(item),
      },
    ];
  }

  async componentDidMount() {
    if (!this.props.connectionToken) {
      await this.props.fetchConnectionToken();
    } else {
      this.initSocket();
    }
  }

  async componentDidUpdate() {
    if (this.props.connectionToken && !this.socket) {
      this.initSocket();
    } else if (this.props.retryConnecting && this.props.connectionToken && !this.socket) {
      if (!this.props.connectionToken) {
        await this.props.fetchConnectionToken();
      } else {
        this.initSocket();
      }
    }
  }

  initSocket() {
    console.log("IVANSNASNANSANSNASNANSNA")
    this.socket = SocketIOClient(
      `${APP_SOCKET_HOST}:${APP_SOCKET_PORT}`, 
      { query: { name: this.props.connectionToken, deviceId: UNIQUE_ID }, transports: ['websocket'] }
    );
    
    if (this.socket) {
      this.events.forEach(({ eventName, cb }) => {
        const callbalck = e => this.handleEventStream(e, cb);
        this.socket.on(eventName, callbalck);
      });
    }
  }

  handleEventStream = (event, cb) => {
    if (Array.isArray(event)) {
      event.forEach(e => cb(e));
      return;
    }
    cb(event || {});
  }

  newConnection() {
    logger.info('new connection')
  }

  connect = () => {
    this.props.socketHealth({ active: true });
  };

  disconnect = () => {
    this.props.socketHealth({ active: false });
  };

  componentWillUnmount() {
    if (this.socket) {
      this.events.forEach(({ eventName, cb }) => {
        this.socket.off(eventName, cb);
      });
    }
  }

  render() {
    return (
      <View />
    );
  }
}

SocketBackgroundProcess.propTypes = {
  socketHealth: PropTypes.func,
};
SocketBackgroundProcess.defaultProps = {
  socketHealth: Function.prototype,
};


const mapDispatchToProps = dispatch => ({
  socketHealth: health => dispatch(appSettingsActions.socketHealth(health)),
  fetchConnectionToken: () => dispatch(appSettingsActions.fetchConnectionToken()),
});

const mapStateToProps = (state) => {
  return {
    connectionToken: get(state, 'appSettings.socket.connectionToken', ''),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocketBackgroundProcess);
