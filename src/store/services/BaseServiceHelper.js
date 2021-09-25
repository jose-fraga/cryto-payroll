import { USER_NO_AUTH } from '../actions/types';
import Logger from '../../utils/logger';

const logger = Logger.get("BaseServiceHelper.js");

class BaseServiceHelper {
  constructor() {
    this.store = null;
  }

  setStore(store) {
    if (!store || !store.dispatch) {
      throw new Error('Error trying to set the store in Base Service Helper. Invalid value.');
    }

    this.store = store;
  }

  setLogoutState() {
    if (!this.store) {
      throw new Error('The store needs to be set in BaseServiceHelper');
    }

    this.store.dispatch({ type: USER_NO_AUTH });
  }

  printToConsoleErrorMessages(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.trace(`static request: ${error.response.data}`);
      logger.trace(`static request: ${error.response.status}`);
      logger.trace(`static request: ${error.response.headers}`, );
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.trace(`static request ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.trace(`static request Error: ${error.message || error.errorDetail}`);
    }
    logger.trace(`static request: ${error.config}`);
  }
}

const baseServiceHelperInstance = new BaseServiceHelper();
export default baseServiceHelperInstance;