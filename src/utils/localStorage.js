import { AsyncStorage } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

const ONE_YEAR_IN_MIN = 525600;
class LocalStorage {
  static async setItem(key, jsonData, expirationMin = ONE_YEAR_IN_MIN) {
    // create record to store
    const expirationMS = expirationMin * 60 * 1000;
    const record = {
      value: JSON.stringify(jsonData),
      timestamp: new Date().getTime() + expirationMS,
    };

    try {
      await AsyncStorage.setItem(key, JSON.stringify(record));
      return Promise.resolve();
    } catch (error) {
      console.warn(`error trying to set item with AsyncStorage ${error}`);
      return Promise.reject(error);
    }
  }

  static async getItem(key) {
    let value = false;
    let rawData;

    try {
      rawData = await AsyncStorage.getItem(key);
      if (rawData) {
        // try to parse JSON. if fail, return unparsed rawData
        try {
          const record = JSON.parse(rawData);
          if (record.timestamp) {
            const expired = new Date().getTime() > record.timestamp;
            if (!expired) {
              try {
                // trying to parse value
                value = JSON.parse(record.value);
              } catch (error) {
                // no need to parse value
                value = record.value;
              }
            } else {
              // remove from storage
              await AsyncStorage.removeItem(key);
            }
          } else {
            value = rawData;
          }
        } catch (error) {
          console.warn(`rawData is not JSON format ${error}`);
          value = rawData;
        }
      }
    } catch (error) {
      console.warn(`error trying to get item with AsyncStorage ${error}`);
      console.warn(`rawData ${rawData}`);
    }

    return value;
  }

  static async getAllItems() {
    const result = {};
    const allKeys = await AsyncStorage.getAllKeys();

    for (let key of allKeys) {
      const item = await this.getItem(key);
      result[key] = item;
    }

    return result;
  }

  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn(`error trying to remove item with AsyncStorage ${error}`);
    }
  }

  static async saveSecureCredentials(username, password) {
    const keychainAccessible = SecureStorage.WHEN_UNLOCKED;

    await SecureStorage.setItemAsync('username', username, { keychainAccessible }).catch(error => {
      console.warn(`Error trying to save username in secure area: ${error}`);
      return Promise.reject(error);
    });

    await SecureStorage.setItemAsync('password', password, { keychainAccessible }).catch(error => {
      console.warn(`Error trying to password secure area: ${error}`);
      return Promise.reject(error);
    });
  }

  static async getSecureUserCredentials() {
    try {
      const username = await SecureStorage.getItemAsync('username');
      const password = await SecureStorage.getItemAsync('password');

      const credentials = { username, password }
      if (!username || !password) {
        return {};
      }

      return credentials;
    } catch (error) {
      console.warn(`Error trying to get user credentials from secure area: ${error}`);
      return Promise.reject(error);
    }
  }

  static async removeSecureUserCredentials() {
    try {
      await SecureStorage.deleteItemAsync('password');
      await SecureStorage.deleteItemAsync('username');
    } catch (error) {
      console.warn(`Error trying to delete user credentials from secure area: ${error}`);
      return Promise.reject(error);
    }
  }
}

export default LocalStorage;