import ApiService from 'services/apiService';

class SampleService extends ApiService {
  constructor() {
    super();
  }

  getSample() {
    return this.get('/sample', {}, {});
  }
}

export const sampleService = new SampleService();
