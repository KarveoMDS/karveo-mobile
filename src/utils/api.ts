import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {generateToken} from '../store/services/auth.service';

const apiClient = axios.create({
  baseURL: 'https://api.karveo.fr/',
  timeout: 1000,
});

export const call = async (
  uri: string,
  method = 'GET',
  data: any = null,
  isAuth = true,
  generateNewToken = false,
): Promise<any> => {
  try {
    const accessToken = isAuth
      ? generateNewToken
        ? await getToken()
        : (await AsyncStorage.getItem('accessToken')) || ''
      : '';

    const response = await apiClient(uri, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    if (error.response.status === 401 && false) {
      call(uri, method, data, isAuth, true);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    }

    if (!error.response) {
      throw Error('CORS ERROR');
    }

    throw error;
  }
};

const getToken = async () => {
  const refreshToken = (await AsyncStorage.getItem('refreshToken')) || '';
  if (!refreshToken) {
    return '';
  }

  generateToken(refreshToken)
    .then(async (aData: any) => {
      await AsyncStorage.setItem('accessToken', aData.accessToken);
      return Promise.resolve();
    })
    .catch((error: any) => {
      return Promise.reject();
    });

  return null;
};
