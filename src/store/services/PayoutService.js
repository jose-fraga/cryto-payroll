import BaseService from './BaseService';

class PayoutService extends BaseService {
  constructor() {
    super('/payout');
  }

  getPayoutMethods() {
    return this.request({
      method: 'GET',
      url: `${this.url}/methods`,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
}

const service = new PayoutService();
export default service;
