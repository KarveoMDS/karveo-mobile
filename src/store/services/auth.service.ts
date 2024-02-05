import AsyncStorage from '@react-native-async-storage/async-storage';
import {call} from '../../utils/api';

export const login = (email: string, password: string) =>
  call('/auth/login', 'POST', {email, password})
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const generateToken = (refreshToken: string) =>
  call('/auth/access-token', 'POST', {refreshToken}, false)
    .then(async ({data}: any) => {
      await AsyncStorage.setItem('accessToken', data.accessToken);
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const getMe = () =>
  call('/auth/me', 'GET')
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
