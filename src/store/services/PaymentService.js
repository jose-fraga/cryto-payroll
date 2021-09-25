import BaseService from './BaseService';
import payments from '../mock/payments';

class PaymentService extends BaseService {
  constructor() {
    super('/payments');
  }

  getPayments() {
    return this.request({
      method: 'GET',
      mock: payments, // TODO: remove this
      url: this.url,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  savePayment(paymentInfo) {
    return this.request({
      method: 'POST',
      url: this.url,
      data: paymentInfo,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  deletePayment({ id }) {
    return this.request({
      method: 'DELETE',
      url: `${this.url}/${id}`,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
}

const paymentService = new PaymentService();
export default paymentService;
