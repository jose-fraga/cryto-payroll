import initialState from './initialState';
import session from './sessionReducers';
import events from './eventReducers';
import appSettings from './appSettingsReducers';
import user from './userReducers';
import * as types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOGOUT:
      return {
        session: initialState.session,
        user: initialState.user,
        appSettings: appSettings(state.appSettings, action),
        events: initialState.events,
      }

    default:
      return {
        session: session(state.session, action),
        user: user(state.user, action),
        appSettings: appSettings(state.appSettings, action),
        events: events(state.events, action),
      };
  }
};

export { initialState };
