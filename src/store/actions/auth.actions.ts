import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADD_TOKEN,
  GET_ME,
  HAS_DISPATCHED,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
} from '../actions';
import {generateToken, getMe, login} from '../services/auth.service';

export const loginAction =
  (email: string, password: string) => (dispatch: any) => {
    dispatch({type: LOGIN_PENDING});

    return login(email, password)
      .then(async (data: any) => {
        await AsyncStorage.setItem('refreshToken', data.refreshToken);
        dispatch({type: LOGIN_SUCCESS, payload: data});
        generateToken(data.refreshToken)
          .then(async (aData: any) => {
            await AsyncStorage.setItem('accessToken', aData.accessToken);
            dispatch({type: ADD_TOKEN, payload: aData.accessToken});
            return Promise.resolve();
          })
          .catch((error: any) => {
            dispatch({type: LOGIN_ERROR, payload: error});
            return Promise.reject();
          });
      })
      .catch((error: any) => {
        dispatch({type: LOGIN_ERROR, payload: error});
        return Promise.reject();
      });
  };

export const accessAction = () => async (dispatch: any) => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (!refreshToken) {
    return;
  }

  generateToken(refreshToken)
    .then((data: any) => {
      dispatch({type: ADD_TOKEN, payload: data.accessToken});
    })
    .catch((error: any) => {
      dispatch({type: LOGIN_ERROR, payload: error});
    });
};

export const getMeAction = () => (dispatch: any) => {
  dispatch({type: HAS_DISPATCHED});
  return getMe()
    .then((data: any) => {
      dispatch({type: GET_ME, payload: data});
      return Promise.resolve();
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
};
