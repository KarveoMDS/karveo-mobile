import AsyncStorage from '@react-native-async-storage/async-storage';
import type {RootState} from '..';
import {useAppSelector} from '../../hooks/store';
import {
  ADD_TOKEN,
  GET_ME,
  HAS_DISPATCHED,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_PAGE_TITLE,
} from '../actions';

const initialState = {
  refreshToken: '',
  accessToken: '',
  isAuthenticated: false,
  isLoading: true,
  user: {},
  selectedSchool: '',
  error: null,
  hasDispatched: false,
  pageTitle: '',
};

const getAccessToken = async () => {
  try {
    const value = await AsyncStorage.getItem('accessToken');
    if (value !== null) {
      initialState.accessToken = value;
    }
  } catch (e) {
    console.log(e);
  }
};

const getRefreshToken = async () => {
  try {
    const value = await AsyncStorage.getItem('refreshToken');
    if (value !== null) {
      initialState.refreshToken = value;
      initialState.isAuthenticated = true;
    }
  } catch (e) {
    console.log(e);
  }
};

getAccessToken().then();
getRefreshToken().then();

export default (state = initialState, action: any) => {
  const {type} = action;

  switch (type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      const {refreshToken} = action.payload;
      return {
        ...state,
        refreshToken,
        isAuthenticated: true,
      };
    case HAS_DISPATCHED:
      return {
        ...state,
        hasDispatched: true,
      };
    case GET_ME:
      return {
        ...state,
        user: action.payload,
        selectedSchool: action.payload.school[0],
      };
    case ADD_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('accessToken');
      return {
        refreshToken: '',
        accessToken: '',
        isAuthenticated: false,
        isLoading: true,
        user: {},
        selectedSchool: '',
        error: null,
        hasDispatched: false,
        pageTitle: '',
      };
    case UPDATE_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload,
      };
    default:
      return state;
  }
};

export const selectCurrentSchool = (s: RootState): string =>
  s.auth.selectedSchool;
export const selectCurrentUser = (s: RootState): any => s.auth.user;
export const selectHasDispatched = (s: RootState): boolean =>
  s.auth.hasDispatched;

export const useCurrentSchool = (): string =>
  useAppSelector(selectCurrentSchool);
export const useCurrentUser = (): any => useAppSelector(selectCurrentUser);

export const useHasDispatched = (): boolean =>
  useAppSelector(selectHasDispatched);
