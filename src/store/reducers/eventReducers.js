import * as types from '../actions/types';
import initialState from './initialState';

function eventReducers(state = initialState.events, action) {
  switch (action.type) {
    case types.GET_USER_EVENTS:
    case types.REGISTER_EVENT:
    case types.GET_EVENTS: {
      const eventsMap = {};
      const events = action.events || [];
      const isUserRegister = action.isUserRegister;

      events.forEach(event => {
        const register = isUserRegister ? { isUserRegister } : {};
        if (state.eventsMap[event.id]) {

          eventsMap[event.id] = {
            ...state.eventsMap[event.id],
            ...event,
            ...register,
          };
        } else {
          eventsMap[event.id] = {
            ...event,
            ...register,
          };
        }
      });

      return { 
        ...state, 
        eventsMap: {
          ...state.eventsMap,
          ...eventsMap,
        } 
      }
    }
    case types.GET_USER_EVENTS_FAILED:
    case types.REGISTER_EVENT_FAILED:
    case types.GET_EVENTS_FAILED:
      return state;

    default:
      return state;
  }
}

export default eventReducers; 