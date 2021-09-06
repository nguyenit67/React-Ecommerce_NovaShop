import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/auth/local/register';
    return axiosClient.post(url, data); // data là data trong post method ✅
  },
  login(data) {
    const url = '/auth/local';
    return axiosClient.post(url, data); // data là data trong post method ✅
  },
};

export default userApi;
