import * as types from './types';
import EventServices from '../services/EventsService';

export default {
  getEvents() {
    return (dispatch) => {
      return EventServices.getEvents()
        .then((res) => {
          return dispatch({ type: types.GET_EVENTS, events: res.events });
        })
        .catch((err) => {
          dispatch({ type: types.GET_EVENTS_FAILED });
          throw err;
        });
    };
  },
  createEvent({ name, startTime, initialBalance, categoryId }) {
    return (dispatch) => {
      return EventServices.createEvent({ name, startTime, initialBalance, categoryId })
        .then((res) => {
          return dispatch({ type: types.CREATE_EVENT, payoutUsername: res.payoutUsername });
        })
        .catch((err) => {
          dispatch({ type: types.CREATE_EVENT_FAILED });
          throw err;
        });
    };
  },
  getEventCategories({ eventId }) {
    return (dispatch) => {
      return EventServices.getEventCategories({ eventId })
        .then((res) => {
          return dispatch({ type: types.GET_EVENT_CATEGORIES });
        })
        .catch((err) => {
          dispatch({ type: types.GET_EVENT_CATEGORIES_FAILED });
          throw err;
        });
    };
  },
  createEventCategory({ eventId, title }) {
    return (dispatch) => {
      return EventServices.createEventCategory({ eventId, title })
        .then((res) => {
          return dispatch({ type: types.CREATE_EVENT_CATEGORY });
        })
        .catch((err) => {
          dispatch({ type: types.CREATE_EVENT_CATEGORY_FAILED });
          throw err;
        });
    };
  },
  createCategoryLevel({ eventId, categoryId, dificultyId }) {
    return (dispatch) => {
      return EventServices.createCategoryLevel({ eventId, categoryId, dificultyId })
        .then((res) => {
          return dispatch({ type: types.CREATE_EVENT_CATEGORY_LEVEL });
        })
        .catch((err) => {
          dispatch({ type: types.CREATE_EVENT_CATEGORY_LEVEL_FAILED });
          throw err;
        });
    };
  },
}; 
