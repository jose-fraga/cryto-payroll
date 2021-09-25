import BaseService from './BaseService';

class EventServices extends BaseService {
  constructor() {
    super('/events');
  }

  getEvents() {
    return this.request({
      method: 'GET',
      url: this.url,
      noAuth: true,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  createEvent({ name, startTime, initialBalance, categoryId }) {
    const data = {
      name,
      startTime,
      initialBalance,
      categoryId,
    };

    return this.request({
      method: 'POST',
      url: this.url,
      data,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  getEventCategories({ eventId }) {
    return this.request({
      method: 'GET',
      url: `${this.url}/${eventId}/categories`,
      noAuth: true,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  createEventCategory({ eventId, title }) {
    return this.request({
      method: 'POST',
      url: `${this.url}/${eventId}/categories`,
      data: {
        title
      },
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  createCategoryLevel({ eventId, categoryId, dificultyId }) {
    return this.request({
      method: 'POST',
      url: `${this.url}/${eventId}/categories/${categoryId}/levels`,
      data: { dificultyId },
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
}

const service = new EventServices();
export default service;
