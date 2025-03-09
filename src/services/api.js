import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://3.6.229.61:9089/v1',
});